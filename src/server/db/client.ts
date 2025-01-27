import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

let db: NodePgDatabase<typeof schema> | null = null;

export function getDb(): NodePgDatabase<typeof schema> {
  if (!db) {
    db = drizzle({
      connection: process.env.DATABASE_URL!,
      casing: 'snake_case',
      schema: schema,
    });
  }
  return db;
}
