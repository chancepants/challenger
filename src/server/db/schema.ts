import {
  pgTable,
  integer,
  varchar,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';

export const tournamentStatus = pgEnum('tournament_status', [
  'Not Started',
  'In Progress',
  'Complete',
]);
export const tournaments = pgTable('tournaments', {
  id: integer().primaryKey(),
  name: varchar().notNull(),
  size: integer().notNull(),
  startTime: timestamp('start_time').notNull(),
  status: tournamentStatus().notNull(),
  owner: varchar().notNull(),
  description: varchar().notNull(),
  logo: varchar().notNull(),
});
