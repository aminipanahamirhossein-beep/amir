import pg from 'pg';

const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  'postgres://atelier:atelier_dev_password@localhost:5432/atelier';

export const pool = new Pool({ connectionString, max: 5 });

pool.on('error', (error) => {
  console.error('[db] unexpected idle client error', error);
});

export function query(text, params) {
  return pool.query(text, params);
}
