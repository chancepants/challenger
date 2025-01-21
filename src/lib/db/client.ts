import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

let db: NodePgDatabase | null = null;

export function getDb(): NodePgDatabase {
  if (!db) {
    db = drizzle({
      connection: process.env.DATABASE_URL!,
      casing: 'snake_case',
    });
  }
  return db;
}
