-- CRM / Operations schema for isolated preview. Additive; no record migration.
CREATE TABLE IF NOT EXISTS crm_workspace (id TEXT PRIMARY KEY, revision INTEGER NOT NULL, data TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS inquiries (id TEXT PRIMARY KEY, dedupe TEXT UNIQUE NOT NULL, kind TEXT NOT NULL, created_at TEXT NOT NULL, data TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS scenarios (id TEXT PRIMARY KEY, property_id TEXT NOT NULL, created_at TEXT NOT NULL, name TEXT NOT NULL, data TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS crm_operations (id TEXT PRIMARY KEY, revision INTEGER NOT NULL, data TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS request_limits (id TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at BIGINT NOT NULL);
INSERT INTO crm_workspace (id,revision,data) VALUES ('company',0,'{"version":4,"records":[],"cases":[],"history":[],"outreachSettings":{}}') ON CONFLICT(id) DO NOTHING;
INSERT INTO crm_operations (id,revision,data) VALUES ('company',0,'{"version":1,"revision":0,"opportunities":[],"tasks":[],"activity":[]}') ON CONFLICT(id) DO NOTHING;

