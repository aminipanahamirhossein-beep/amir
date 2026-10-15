import { query } from './db.js';

const STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS contact_messages (
     id SERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     project_type TEXT NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMPTZ NOT NULL DEFAULT now()
   )`,
];

const attempts = 10;

/**
 * Creates the schema if it is missing. Idempotent, so it is safe to run on
 * every boot: the API is ready to accept submissions as soon as it listens.
 */
export async function ensureSchema() {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      for (const statement of STATEMENTS) {
        await query(statement);
      }
      return;
    } catch (error) {
      if (attempt === attempts) throw error;
      console.warn(`[db] schema not ready (attempt ${attempt}/${attempts}): ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }
}
