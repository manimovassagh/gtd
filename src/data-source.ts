import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || "postgres",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "postgres",
  synchronize: true, // Automatically sync schema; turn off in production
  logging: true,
  entities: [__dirname + "/entities/*.{js,ts}"], // Point to entities folder
  migrations: [__dirname + "/migrations/*.{js,ts}"], // Point to migrations folder
});