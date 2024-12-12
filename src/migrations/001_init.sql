CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  passwordHash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('inbox', 'next_action', 'waiting_for', 'someday_maybe')),
  dueDate TIMESTAMP,
  contextTags TEXT,
  userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);