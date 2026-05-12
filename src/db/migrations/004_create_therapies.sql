CREATE TABLE therapies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
