-- Animal Face Test - Database Schema
-- Target: Neon Serverless PostgreSQL

CREATE TABLE IF NOT EXISTS animal_face_results (
    id              SERIAL PRIMARY KEY,
    animal_id       VARCHAR(50) NOT NULL,
    client_ip       VARCHAR(45) DEFAULT '',
    user_agent      VARCHAR(512) DEFAULT '',
    accept_language VARCHAR(128) DEFAULT '',
    referer         VARCHAR(512) DEFAULT '',
    country         VARCHAR(2) DEFAULT '',
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_results_animal_id ON animal_face_results (animal_id);
CREATE INDEX IF NOT EXISTS idx_results_created_at ON animal_face_results (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_results_client_ip ON animal_face_results (client_ip);
CREATE INDEX IF NOT EXISTS idx_results_country ON animal_face_results (country);

CREATE OR REPLACE VIEW animal_face_daily_stats AS
SELECT
    animal_id,
    DATE(created_at) AS date,
    COUNT(*) AS count
FROM animal_face_results
GROUP BY animal_id, DATE(created_at)
ORDER BY date DESC, count DESC;
