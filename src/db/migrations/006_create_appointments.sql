CREATE TABLE appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id INTEGER NOT NULL REFERENCES agents(id),
  therapist_name TEXT NOT NULL,
  datetime TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
