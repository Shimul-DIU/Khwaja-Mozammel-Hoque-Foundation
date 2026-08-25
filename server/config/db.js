import pg from "pg";
import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const { Pool } = pg;

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(currentDirectory, "../database/userSchema.sql");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl:
    process.env.NODE_ENV === "production"
      ? {
        rejectUnauthorized: false,
      }
      : false,
});

pool.on("connect", () => {
  console.log("PostgreSQL connected");
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL error:", error);
});

export const initializeDatabase = async () => {
  const schema = await fs.readFile(schemaPath, "utf8");
  await pool.query(schema);
  console.log("Database schema is ready");
};

export default pool;