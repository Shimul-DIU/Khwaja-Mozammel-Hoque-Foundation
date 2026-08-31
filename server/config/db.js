import pg from "pg";
import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const { Pool } = pg;

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(currentDirectory, "../.env") });

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

  const kmrfColumn = await pool.query(`
    SELECT data_type
    FROM information_schema.columns
    WHERE table_name = 'devotees' AND column_name = 'kmrf_id'
  `);

  if (kmrfColumn.rows[0]?.data_type === "ARRAY") {
    await pool.query(`
      ALTER TABLE devotees
      ALTER COLUMN kmrf_id TYPE VARCHAR(30)
      USING CASE
        WHEN kmrf_id IS NULL OR cardinality(kmrf_id) = 0 THEN NULL
        ELSE kmrf_id[1]
      END
    `);
  }

  await pool.query(`
    UPDATE devotees
    SET kmrf_id = 'KMRF-' || LPAD(nextval('kmrf_id_seq')::TEXT, 6, '0')
    WHERE kmrf_id IS NULL
  `);

  await pool.query(`
    ALTER TABLE devotees
    ALTER COLUMN kmrf_id SET DEFAULT 'KMRF-' || LPAD(nextval('kmrf_id_seq')::TEXT, 6, '0'),
    ALTER COLUMN kmrf_id SET NOT NULL
  `);

  const primaryKey = await pool.query(`
    SELECT conname, pg_get_constraintdef(oid) AS definition
    FROM pg_constraint
    WHERE conrelid = 'devotees'::regclass AND contype = 'p'
  `);

  if (primaryKey.rows[0] && !primaryKey.rows[0].definition.includes("kmrf_id")) {
    await pool.query(`ALTER TABLE devotees DROP CONSTRAINT ${primaryKey.rows[0].conname}`);
    await pool.query(`ALTER TABLE devotees ADD PRIMARY KEY (kmrf_id)`);
  }

  console.log("Database schema is ready");
};

export default pool;