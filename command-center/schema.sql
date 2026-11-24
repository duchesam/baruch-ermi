-- Apply only to an isolated database. Units: millionths of USD.
CREATE TABLE IF NOT EXISTS command_budget (id integer PRIMARY KEY CHECK(id=1), reserved bigint NOT NULL CHECK(reserved BETWEEN 0 AND 4500000));
INSERT INTO command_budget VALUES (1,0) ON CONFLICT DO NOTHING;
-- Atomic reservation; caller MUST reject if no row returned:
-- UPDATE command_budget SET reserved=reserved+$1 WHERE id=1 AND $1>0 AND reserved+$1<=4500000 RETURNING reserved;
CREATE TABLE IF NOT EXISTS command_runs (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), created_at timestamptz NOT NULL DEFAULT now(), task text NOT NULL, draft text, review text, final text, status text NOT NULL);
