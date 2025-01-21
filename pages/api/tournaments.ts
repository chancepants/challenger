import { getDb } from '@/src/lib/db/client';
import { tournaments } from '@/src/lib/db/schema';
import {
  ListTournamentEntry,
  ListTournamentsResponse,
  Tournament,
  TournamentStatus,
  tournamentStatusFromValue,
} from '@/src/lib/tournaments';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListTournamentsResponse | Tournament>
) {
  const db = getDb();
  switch (req.method) {
    case 'POST':
      console.log(req.body);
      const tourny: Tournament = {
        id: Math.floor(Math.random() * 1_000_000),
        name: "Chance's House of Horrors",
        size: 16,
        startTime: new Date(1737342424),
        status: TournamentStatus.NOT_STARTED,
        owner: 'chance',
        logo: 'todo',
        description: 'this thing is awesome',
      };
      createTournament(db, tourny);
      res.status(201).json(tourny);
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
  tournament: Tournament
): Promise<void> {
  await db.insert(tournaments).values({ ...tournament });
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
