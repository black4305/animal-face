import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

interface AnimalProfile {
  eye_width_ratio: number;
  eye_height_ratio: number;
  nose_length_ratio: number;
  nose_width_ratio: number;
  face_roundness: number;
  lip_thickness: number;
  jaw_angle: number;
  forehead_ratio: number;
  eye_distance_ratio: number;
  face_taper: number;
}

interface Animal {
  name: string;
  emoji: string;
  profile: AnimalProfile;
}

interface AnimalMatch {
  id: string;
  name: string;
  emoji: string;
  percentage: number;
}

type FeatureKey = keyof AnimalProfile;

const ANIMALS: Record<string, Animal> = {
  dog: {
    name: "Dog",
    emoji: "🐶",
    profile: {
      eye_width_ratio:    0.115,
      eye_height_ratio:   0.055,
      nose_length_ratio:  0.140,
      nose_width_ratio:   0.160,
      face_roundness:     1.00,
      lip_thickness:      0.055,
      jaw_angle:          0.88,
      forehead_ratio:     0.35,
      eye_distance_ratio: 0.45,
      face_taper:         0.80,
    },
  },
  cat: {
    name: "Cat",
    emoji: "🐱",
    profile: {
      eye_width_ratio:    0.130,
      eye_height_ratio:   0.042,
      nose_length_ratio:  0.100,
      nose_width_ratio:   0.110,
      face_roundness:     0.88,
      lip_thickness:      0.040,
      jaw_angle:          0.75,
      forehead_ratio:     0.38,
      eye_distance_ratio: 0.50,
      face_taper:         0.70,
    },
  },
  fox: {
    name: "Fox",
    emoji: "🦊",
    profile: {
      eye_width_ratio:    0.125,
      eye_height_ratio:   0.040,
      nose_length_ratio:  0.130,
      nose_width_ratio:   0.105,
      face_roundness:     0.80,
      lip_thickness:      0.038,
      jaw_angle:          0.68,
      forehead_ratio:     0.36,
      eye_distance_ratio: 0.42,
      face_taper:         0.65,
    },
  },
  bear: {
    name: "Bear",
    emoji: "🐻",
    profile: {
      eye_width_ratio:    0.090,
      eye_height_ratio:   0.045,
      nose_length_ratio:  0.155,
      nose_width_ratio:   0.195,
      face_roundness:     1.08,
      lip_thickness:      0.060,
      jaw_angle:          0.95,
      forehead_ratio:     0.32,
      eye_distance_ratio: 0.48,
      face_taper:         0.88,
    },
  },
  rabbit: {
    name: "Rabbit",
    emoji: "🐰",
    profile: {
      eye_width_ratio:    0.135,
      eye_height_ratio:   0.065,
      nose_length_ratio:  0.090,
      nose_width_ratio:   0.100,
      face_roundness:     1.02,
      lip_thickness:      0.048,
      jaw_angle:          0.80,
      forehead_ratio:     0.40,
      eye_distance_ratio: 0.52,
      face_taper:         0.75,
    },
  },
  deer: {
    name: "Deer",
    emoji: "🦌",
    profile: {
      eye_width_ratio:    0.140,
      eye_height_ratio:   0.068,
      nose_length_ratio:  0.120,
      nose_width_ratio:   0.105,
      face_roundness:     0.85,
      lip_thickness:      0.042,
      jaw_angle:          0.72,
      forehead_ratio:     0.42,
      eye_distance_ratio: 0.55,
      face_taper:         0.68,
    },
  },
  hamster: {
    name: "Hamster",
    emoji: "🐹",
    profile: {
      eye_width_ratio:    0.110,
      eye_height_ratio:   0.060,
      nose_length_ratio:  0.080,
      nose_width_ratio:   0.105,
      face_roundness:     1.15,
      lip_thickness:      0.052,
      jaw_angle:          0.92,
      forehead_ratio:     0.38,
      eye_distance_ratio: 0.50,
      face_taper:         0.84,
    },
  },
  wolf: {
    name: "Wolf",
    emoji: "🐺",
    profile: {
      eye_width_ratio:    0.118,
      eye_height_ratio:   0.038,
      nose_length_ratio:  0.145,
      nose_width_ratio:   0.130,
      face_roundness:     0.82,
      lip_thickness:      0.040,
      jaw_angle:          0.78,
      forehead_ratio:     0.34,
      eye_distance_ratio: 0.44,
      face_taper:         0.72,
    },
  },
  penguin: {
    name: "Penguin",
    emoji: "🐧",
    profile: {
      eye_width_ratio:    0.100,
      eye_height_ratio:   0.058,
      nose_length_ratio:  0.160,
      nose_width_ratio:   0.115,
      face_roundness:     1.05,
      lip_thickness:      0.050,
      jaw_angle:          0.82,
      forehead_ratio:     0.36,
      eye_distance_ratio: 0.46,
      face_taper:         0.76,
    },
  },
  owl: {
    name: "Owl",
    emoji: "🦉",
    profile: {
      eye_width_ratio:    0.155,
      eye_height_ratio:   0.082,
      nose_length_ratio:  0.085,
      nose_width_ratio:   0.095,
      face_roundness:     1.10,
      lip_thickness:      0.038,
      jaw_angle:          0.76,
      forehead_ratio:     0.44,
      eye_distance_ratio: 0.58,
      face_taper:         0.72,
    },
  },
  squirrel: {
    name: "Squirrel",
    emoji: "🐿️",
    profile: {
      eye_width_ratio:    0.120,
      eye_height_ratio:   0.062,
      nose_length_ratio:  0.082,
      nose_width_ratio:   0.098,
      face_roundness:     1.05,
      lip_thickness:      0.045,
      jaw_angle:          0.85,
      forehead_ratio:     0.40,
      eye_distance_ratio: 0.53,
      face_taper:         0.78,
    },
  },
  dinosaur: {
    name: "Dinosaur",
    emoji: "🦕",
    profile: {
      eye_width_ratio:    0.105,
      eye_height_ratio:   0.038,
      nose_length_ratio:  0.175,
      nose_width_ratio:   0.145,
      face_roundness:     0.72,
      lip_thickness:      0.035,
      jaw_angle:          0.98,
      forehead_ratio:     0.30,
      eye_distance_ratio: 0.40,
      face_taper:         0.62,
    },
  },
};

const FEATURE_WEIGHTS: Record<FeatureKey, number> = {
  eye_width_ratio:    1.5,
  eye_height_ratio:   1.5,
  nose_length_ratio:  1.2,
  nose_width_ratio:   1.2,
  face_roundness:     2.0,
  lip_thickness:      0.8,
  jaw_angle:          1.4,
  forehead_ratio:     1.0,
  eye_distance_ratio: 1.3,
  face_taper:         1.6,
};

const FEATURE_KEYS = Object.keys(FEATURE_WEIGHTS) as FeatureKey[];
const ANIMAL_IDS = Object.keys(ANIMALS);

function matchAnimal(features: AnimalProfile): AnimalMatch[] {
  const distances = ANIMAL_IDS.map((animalId) => {
    const profile = ANIMALS[animalId].profile;
    let sumWeightedSqDiff = 0;
    for (const key of FEATURE_KEYS) {
      const norm = profile[key] !== 0 ? profile[key] : 1.0;
      const relDiff = (features[key] - profile[key]) / norm;
      sumWeightedSqDiff += FEATURE_WEIGHTS[key] * relDiff * relDiff;
    }
    return Math.sqrt(sumWeightedSqDiff);
  });

  const maxDist = Math.max(...distances);
  let rawSim = distances.map((d) => maxDist - d);

  const minSim = Math.min(...rawSim);
  if (minSim < 0) {
    rawSim = rawSim.map((s) => s - minSim);
  }

  const total = rawSim.reduce((a, b) => a + b, 0) || 1.0;
  const percentages = rawSim.map((s) => (s / total) * 100);

  const indexed = ANIMAL_IDS.map((id, i) => ({ id, percentage: percentages[i] }));
  indexed.sort((a, b) => b.percentage - a.percentage);

  return indexed.map(({ id, percentage }) => ({
    id,
    name: ANIMALS[id].name,
    emoji: ANIMALS[id].emoji,
    percentage: Math.round(percentage * 100) / 100,
  }));
}

async function saveResult(req: VercelRequest, animalId: string): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return;

  try {
    const sql = neon(databaseUrl);
    const clientIp = ((req.headers["x-forwarded-for"] as string) || "").split(",")[0].trim();
    const userAgent = (req.headers["user-agent"] as string) || "";
    const acceptLanguage = ((req.headers["accept-language"] as string) || "").slice(0, 128);
    const referer = ((req.headers["referer"] as string) || "").slice(0, 512);
    const country = (req.headers["x-vercel-ip-country"] as string) || "";

    await sql`
      INSERT INTO animal_face_results
        (animal_id, client_ip, user_agent, accept_language, referer, country)
      VALUES
        (${animalId}, ${clientIp}, ${userAgent.slice(0, 512)}, ${acceptLanguage}, ${referer}, ${country})
    `;
  } catch (err) {
    console.warn("Failed to save result:", err);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body as { features?: Record<string, unknown> };

    if (!body || typeof body.features !== "object" || body.features === null) {
      return res.status(400).json({ error: "Missing or invalid features object." });
    }

    const rawFeatures = body.features;
    for (const key of FEATURE_KEYS) {
      if (typeof rawFeatures[key] !== "number") {
        return res.status(400).json({ error: `Missing or invalid feature: ${key}` });
      }
    }

    const features = rawFeatures as unknown as AnimalProfile;
    const matches = matchAnimal(features);
    const topAnimal = matches[0]?.id ?? "unknown";

    await saveResult(req, topAnimal);

    return res.status(200).json({ topAnimal, matches });
  } catch (err) {
    console.error("Unexpected error in analyze:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
}
