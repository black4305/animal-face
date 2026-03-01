import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  return res.status(200).json({
    status: "ok",
    service: "animal-face-api",
    platform: "vercel",
  });
}
