import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const totalRows = await sql`SELECT COUNT(*) AS total FROM animal_face_results`;
    const perAnimal = await sql`
      SELECT animal_id, COUNT(*) AS count
      FROM animal_face_results
      GROUP BY animal_id
      ORDER BY count DESC
    `;

    const animalCounts: Record<string, number> = {};
    for (const row of perAnimal) {
      animalCounts[row.animal_id as string] = Number(row.count);
    }

    return res.status(200).json({
      totalAnalyses: Number(totalRows[0].total),
      animalCounts,
    });
  } catch (err) {
    console.error("Failed to retrieve statistics:", err);
    return res.status(500).json({ error: "Failed to retrieve statistics." });
  }
}
