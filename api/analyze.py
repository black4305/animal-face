from http.server import BaseHTTPRequestHandler
import json
import logging
import os
import re

import animal_matcher

logger = logging.getLogger(__name__)

MAX_IMAGE_SIZE = 10 * 1024 * 1024


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Accept, Accept-Language")
        self.end_headers()

    def do_POST(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            content_type = self.headers.get("Content-Type", "")

            if "multipart/form-data" in content_type:
                image_bytes = _extract_image(body, content_type)
            else:
                image_bytes = body

            if len(image_bytes) > MAX_IMAGE_SIZE:
                return self._json_response(413, {"error": "Image too large. Maximum size is 10MB."})

            features = animal_matcher.extract_features(image_bytes)
            matches = animal_matcher.match_animal(features)
            top_animal = matches[0]["id"] if matches else "unknown"

            _save_result(self.headers, top_animal)

            self._json_response(200, {"topAnimal": top_animal, "matches": matches})

        except ValueError as e:
            self._json_response(422, {"error": str(e)})
        except Exception:
            logger.exception("Unexpected error in analyze")
            self._json_response(500, {"error": "Internal server error."})

    def _json_response(self, status: int, body: dict):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(body).encode())


def _extract_image(body: bytes, content_type: str) -> bytes:
    boundary_match = re.search(r"boundary=([^\s;]+)", content_type)
    if not boundary_match:
        raise ValueError("Missing boundary in Content-Type header.")

    boundary = boundary_match.group(1).strip(' "').encode()
    parts = body.split(b"--" + boundary)

    for part in parts:
        if b"Content-Disposition" not in part:
            continue
        if b'name="image"' not in part and b'name="file"' not in part:
            continue
        split = part.split(b"\r\n\r\n", 1)
        if len(split) < 2:
            continue
        data = split[1]
        if data.endswith(b"--\r\n"):
            data = data[:-4]
        elif data.endswith(b"--"):
            data = data[:-2]
        if data.endswith(b"\r\n"):
            data = data[:-2]
        return data

    raise ValueError("No image field found in multipart form data.")


def _save_result(headers, animal_id: str):
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        return

    try:
        import psycopg2

        client_ip = (headers.get("x-forwarded-for") or "").split(",")[0].strip()
        user_agent = headers.get("user-agent") or ""
        accept_language = (headers.get("accept-language") or "")[:128]
        referer = (headers.get("referer") or "")[:512]
        country = headers.get("x-vercel-ip-country") or ""

        conn = psycopg2.connect(database_url, connect_timeout=5)
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """INSERT INTO animal_face_results
                       (animal_id, client_ip, user_agent, accept_language, referer, country)
                       VALUES (%s, %s, %s, %s, %s, %s)""",
                    (animal_id, client_ip, user_agent[:512], accept_language, referer, country),
                )
            conn.commit()
        finally:
            conn.close()
    except Exception:
        logger.warning("Failed to save result", exc_info=True)
