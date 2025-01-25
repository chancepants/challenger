import { getDb } from '@/src/lib/db/client';
import { tournaments } from '@/src/lib/db/schema';
import {
  CreateTournamentProps,
  ListTournamentEntry,
  ListTournamentsResponse,
  Tournament,
  TournamentStatus,
  tournamentStatusFromValue,
} from '@/src/lib/tournament/tournaments';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListTournamentsResponse | Tournament>
) {
  const db = getDb();
  switch (req.method) {
    case 'POST':
      const tournament = await createTournament(db, req.body);
      res.status(201).json(tournament);
      break;
    case 'GET':
      // TODO could just pick out ListTournamentEntry cols or update model to return full
      res.status(200).json({ tournaments: await listTournaments(db) });
      break;
    default:
      throw new Error('ahh');
  }
}

async function createTournament(
  db: NodePgDatabase,
  body: any
): Promise<Tournament> {
  const createProps: CreateTournamentProps = JSON.parse(body, (key, val) => {
    if (key == 'startTime') {
      return new Date(val);
    }
    return val;
  });
  const tournament: Tournament = {
    id: Math.floor(Math.random() * 10_000),
    status: TournamentStatus.NOT_STARTED,
    owner: 'Chance',
    logo: 'TODO',
    ...createProps,
  };
  await db.insert(tournaments).values({ ...tournament });
  return tournament;
}

async function listTournaments(
  db: NodePgDatabase
): Promise<ListTournamentEntry[]> {
  const response = await db.select().from(tournaments);
  return response.map((tEntry) => {
    return {
      id: tEntry.id,
      name: tEntry.name,
      size: tEntry.size,
      startTime: tEntry.startTime,
      status: tournamentStatusFromValue.get(tEntry.status)!,
    };
  });
}
