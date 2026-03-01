import io
import math
import numpy as np
from PIL import Image
import mediapipe as mp

ANIMALS = {
    "dog": {
        "name": "Dog",
        "emoji": "🐶",
        "profile": {
            "eye_width_ratio":    0.115,
            "eye_height_ratio":   0.055,
            "nose_length_ratio":  0.140,
            "nose_width_ratio":   0.160,
            "face_roundness":     1.00,
            "lip_thickness":      0.055,
            "jaw_angle":          0.88,
            "forehead_ratio":     0.35,
            "eye_distance_ratio": 0.45,
            "face_taper":         0.80,
        },
    },
    "cat": {
        "name": "Cat",
        "emoji": "🐱",
        "profile": {
            "eye_width_ratio":    0.130,
            "eye_height_ratio":   0.042,
            "nose_length_ratio":  0.100,
            "nose_width_ratio":   0.110,
            "face_roundness":     0.88,
            "lip_thickness":      0.040,
            "jaw_angle":          0.75,
            "forehead_ratio":     0.38,
            "eye_distance_ratio": 0.50,
            "face_taper":         0.70,
        },
    },
    "fox": {
        "name": "Fox",
        "emoji": "🦊",
        "profile": {
            "eye_width_ratio":    0.125,
            "eye_height_ratio":   0.040,
            "nose_length_ratio":  0.130,
            "nose_width_ratio":   0.105,
            "face_roundness":     0.80,
            "lip_thickness":      0.038,
            "jaw_angle":          0.68,
            "forehead_ratio":     0.36,
            "eye_distance_ratio": 0.42,
            "face_taper":         0.65,
        },
    },
    "bear": {
        "name": "Bear",
        "emoji": "🐻",
        "profile": {
            "eye_width_ratio":    0.090,
            "eye_height_ratio":   0.045,
            "nose_length_ratio":  0.155,
            "nose_width_ratio":   0.195,
            "face_roundness":     1.08,
            "lip_thickness":      0.060,
            "jaw_angle":          0.95,
            "forehead_ratio":     0.32,
            "eye_distance_ratio": 0.48,
            "face_taper":         0.88,
        },
    },
    "rabbit": {
        "name": "Rabbit",
        "emoji": "🐰",
        "profile": {
            "eye_width_ratio":    0.135,
            "eye_height_ratio":   0.065,
            "nose_length_ratio":  0.090,
            "nose_width_ratio":   0.100,
            "face_roundness":     1.02,
            "lip_thickness":      0.048,
            "jaw_angle":          0.80,
            "forehead_ratio":     0.40,
            "eye_distance_ratio": 0.52,
            "face_taper":         0.75,
        },
    },
    "deer": {
        "name": "Deer",
        "emoji": "🦌",
        "profile": {
            "eye_width_ratio":    0.140,
            "eye_height_ratio":   0.068,
            "nose_length_ratio":  0.120,
            "nose_width_ratio":   0.105,
            "face_roundness":     0.85,
            "lip_thickness":      0.042,
            "jaw_angle":          0.72,
            "forehead_ratio":     0.42,
            "eye_distance_ratio": 0.55,
            "face_taper":         0.68,
        },
    },
    "hamster": {
        "name": "Hamster",
        "emoji": "🐹",
        "profile": {
            "eye_width_ratio":    0.110,
            "eye_height_ratio":   0.060,
            "nose_length_ratio":  0.080,
            "nose_width_ratio":   0.105,
            "face_roundness":     1.15,
            "lip_thickness":      0.052,
            "jaw_angle":          0.92,
            "forehead_ratio":     0.38,
            "eye_distance_ratio": 0.50,
            "face_taper":         0.84,
        },
    },
    "wolf": {
        "name": "Wolf",
        "emoji": "🐺",
        "profile": {
            "eye_width_ratio":    0.118,
            "eye_height_ratio":   0.038,
            "nose_length_ratio":  0.145,
            "nose_width_ratio":   0.130,
            "face_roundness":     0.82,
            "lip_thickness":      0.040,
            "jaw_angle":          0.78,
            "forehead_ratio":     0.34,
            "eye_distance_ratio": 0.44,
            "face_taper":         0.72,
        },
    },
    "penguin": {
        "name": "Penguin",
        "emoji": "🐧",
        "profile": {
            "eye_width_ratio":    0.100,
            "eye_height_ratio":   0.058,
            "nose_length_ratio":  0.160,
            "nose_width_ratio":   0.115,
            "face_roundness":     1.05,
            "lip_thickness":      0.050,
            "jaw_angle":          0.82,
            "forehead_ratio":     0.36,
            "eye_distance_ratio": 0.46,
            "face_taper":         0.76,
        },
    },
    "owl": {
        "name": "Owl",
        "emoji": "🦉",
        "profile": {
            "eye_width_ratio":    0.155,
            "eye_height_ratio":   0.082,
            "nose_length_ratio":  0.085,
            "nose_width_ratio":   0.095,
            "face_roundness":     1.10,
            "lip_thickness":      0.038,
            "jaw_angle":          0.76,
            "forehead_ratio":     0.44,
            "eye_distance_ratio": 0.58,
            "face_taper":         0.72,
        },
    },
    "squirrel": {
        "name": "Squirrel",
        "emoji": "🐿️",
        "profile": {
            "eye_width_ratio":    0.120,
            "eye_height_ratio":   0.062,
            "nose_length_ratio":  0.082,
            "nose_width_ratio":   0.098,
            "face_roundness":     1.05,
            "lip_thickness":      0.045,
            "jaw_angle":          0.85,
            "forehead_ratio":     0.40,
            "eye_distance_ratio": 0.53,
            "face_taper":         0.78,
        },
    },
    "dinosaur": {
        "name": "Dinosaur",
        "emoji": "🦕",
        "profile": {
            "eye_width_ratio":    0.105,
            "eye_height_ratio":   0.038,
            "nose_length_ratio":  0.175,
            "nose_width_ratio":   0.145,
            "face_roundness":     0.72,
            "lip_thickness":      0.035,
            "jaw_angle":          0.98,
            "forehead_ratio":     0.30,
            "eye_distance_ratio": 0.40,
            "face_taper":         0.62,
        },
    },
}

FEATURE_WEIGHTS = {
    "eye_width_ratio":    1.5,
    "eye_height_ratio":   1.5,
    "nose_length_ratio":  1.2,
    "nose_width_ratio":   1.2,
    "face_roundness":     2.0,
    "lip_thickness":      0.8,
    "jaw_angle":          1.4,
    "forehead_ratio":     1.0,
    "eye_distance_ratio": 1.3,
    "face_taper":         1.6,
}

MAX_IMAGE_PIXELS = 4096 * 4096  # ~16 megapixels

_feature_keys = list(FEATURE_WEIGHTS.keys())
_weights = np.array([FEATURE_WEIGHTS[k] for k in _feature_keys])
_animal_ids = list(ANIMALS.keys())
_profile_matrix = np.array([[ANIMALS[aid]["profile"][k] for k in _feature_keys] for aid in _animal_ids])
_norm_matrix = np.where(_profile_matrix != 0, _profile_matrix, 1.0)

_face_mesh = None


def _get_face_mesh():
    global _face_mesh
    if _face_mesh is None:
        _face_mesh = mp.solutions.face_mesh.FaceMesh(
            static_image_mode=True,
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5,
        )
    return _face_mesh


def _landmark_point(landmarks, idx: int, img_w: int, img_h: int) -> tuple[float, float]:
    lm = landmarks[idx]
    return lm.x * img_w, lm.y * img_h


def _dist(a: tuple[float, float], b: tuple[float, float]) -> float:
    return math.hypot(a[0] - b[0], a[1] - b[1])


def extract_features(image_bytes: bytes) -> dict:
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    if image.width * image.height > MAX_IMAGE_PIXELS:
        raise ValueError("Image resolution too high. Maximum is 4096x4096 pixels.")

    # Downsample large images for faster processing
    MAX_DIM = 1024
    if image.width > MAX_DIM or image.height > MAX_DIM:
        ratio = min(MAX_DIM / image.width, MAX_DIM / image.height)
        new_size = (int(image.width * ratio), int(image.height * ratio))
        image = image.resize(new_size, Image.Resampling.LANCZOS)

    img_array = np.array(image)
    img_h, img_w = img_array.shape[:2]

    face_mesh = _get_face_mesh()
    results = face_mesh.process(img_array)

    if not results.multi_face_landmarks:
        raise ValueError("No face detected in the image.")

    lm = results.multi_face_landmarks[0].landmark

    def pt(idx):
        return _landmark_point(lm, idx, img_w, img_h)

    # Face bounding box — single-pass min/max
    min_x = min_y = float('inf')
    max_x = max_y = float('-inf')
    for l in lm:
        px, py = l.x * img_w, l.y * img_h
        if px < min_x: min_x = px
        if px > max_x: max_x = px
        if py < min_y: min_y = py
        if py > max_y: max_y = py
    face_width = max_x - min_x
    face_height = max_y - min_y

    # Eye landmarks (MediaPipe 468-point FaceMesh)
    # Left eye outer/inner corners: 33, 133 | right eye: 362, 263
    # Eye height via top/bottom: left 159/145, right 386/374
    left_eye_outer = pt(33)
    left_eye_inner = pt(133)
    left_eye_top = pt(159)
    left_eye_bottom = pt(145)

    right_eye_outer = pt(263)
    right_eye_inner = pt(362)
    right_eye_top = pt(386)
    right_eye_bottom = pt(374)

    left_eye_w = _dist(left_eye_outer, left_eye_inner)
    left_eye_h = _dist(left_eye_top, left_eye_bottom)
    right_eye_w = _dist(right_eye_outer, right_eye_inner)
    right_eye_h = _dist(right_eye_top, right_eye_bottom)
    avg_eye_w = (left_eye_w + right_eye_w) / 2
    avg_eye_h = (left_eye_h + right_eye_h) / 2

    # Eye center distance
    left_center = ((left_eye_outer[0] + left_eye_inner[0]) / 2,
                   (left_eye_outer[1] + left_eye_inner[1]) / 2)
    right_center = ((right_eye_outer[0] + right_eye_inner[0]) / 2,
                    (right_eye_outer[1] + right_eye_inner[1]) / 2)
    eye_distance = _dist(left_center, right_center)

    # Nose: tip 1, bridge 6, left ala 98, right ala 327
    nose_tip = pt(1)
    nose_bridge = pt(6)
    nose_left = pt(98)
    nose_right = pt(327)

    nose_length = _dist(nose_bridge, nose_tip)
    nose_width = _dist(nose_left, nose_right)

    # Lips: top center 13, bottom center 14
    lip_top = pt(13)
    lip_bottom = pt(14)

    lip_height = _dist(lip_top, lip_bottom)

    # Jaw / cheekbone
    # Jaw: leftmost 234, rightmost 454
    # Cheekbone: 123 (left), 352 (right)
    jaw_left = pt(234)
    jaw_right = pt(454)
    cheek_left = pt(123)
    cheek_right = pt(352)

    jaw_width = _dist(jaw_left, jaw_right)
    cheek_width = _dist(cheek_left, cheek_right)

    # Forehead: top of face bbox vs eyebrow midpoint (105 = left brow, 334 = right brow)
    brow_left = pt(105)
    brow_right = pt(334)
    brow_y = (brow_left[1] + brow_right[1]) / 2
    face_top_y = min_y
    forehead_h = brow_y - face_top_y

    safe_fw = face_width if face_width > 0 else 1.0
    safe_fh = face_height if face_height > 0 else 1.0
    safe_cw = cheek_width if cheek_width > 0 else 1.0

    return {
        "eye_width_ratio":    avg_eye_w / safe_fw,
        "eye_height_ratio":   avg_eye_h / safe_fh,
        "nose_length_ratio":  nose_length / safe_fh,
        "nose_width_ratio":   nose_width / safe_fw,
        "face_roundness":     safe_fw / safe_fh,
        "lip_thickness":      lip_height / safe_fh,
        "jaw_angle":          jaw_width / safe_cw,
        "forehead_ratio":     forehead_h / safe_fh,
        "eye_distance_ratio": eye_distance / safe_fw,
        "face_taper":         jaw_width / safe_fw,
    }


def match_animal(features: dict) -> list[dict]:
    feature_vec = np.array([features.get(k, 0) for k in _feature_keys])

    rel_diff = (feature_vec - _profile_matrix) / _norm_matrix
    distances = np.sqrt(np.sum(_weights * rel_diff ** 2, axis=1))

    max_dist = distances.max()
    raw_sim = max_dist - distances

    min_sim = raw_sim.min()
    if min_sim < 0:
        raw_sim -= min_sim

    total = raw_sim.sum() or 1.0
    percentages = (raw_sim / total) * 100

    sorted_indices = np.argsort(-percentages)

    return [
        {
            "id":         _animal_ids[i],
            "name":       ANIMALS[_animal_ids[i]]["name"],
            "emoji":      ANIMALS[_animal_ids[i]]["emoji"],
            "percentage": round(float(percentages[i]), 2),
        }
        for i in sorted_indices
    ]
