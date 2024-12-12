import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function getDBConnection(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
  if (!db) {
    db = await open({
      filename: 'gtd.db',
      driver: sqlite3.Database
    });

    await runMigrations(db);
  }
  return db;
}

async function runMigrations(db: Database<sqlite3.Database, sqlite3.Statement>) {
  // Create users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      passwordHash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user'
    );
  `);

  // Create tasks table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL CHECK(status IN ('inbox', 'next_action', 'waiting_for', 'someday_maybe')),
      dueDate TEXT,
      contextTags TEXT,
      userId INTEGER NOT NULL,
      FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
}