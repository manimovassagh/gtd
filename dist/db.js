"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDBConnection = getDBConnection;
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
let db;
async function getDBConnection() {
    if (!db) {
        db = await (0, sqlite_1.open)({
            filename: 'gtd.db',
            driver: sqlite3_1.default.Database
        });
        await runMigrations(db);
    }
    return db;
}
async function runMigrations(db) {
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
