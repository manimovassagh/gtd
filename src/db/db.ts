import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { runMigrations } from './migration/initDb';

export let db: Database<sqlite3.Database, sqlite3.Statement>;

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
