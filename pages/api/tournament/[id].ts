import { NextApiRequest, NextApiResponse } from 'next';
import {
  Tournament,
  TournamentStatus,
  tournamentStatusFromValue,
} from '@/src/lib/tournament/tournaments';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { tournaments } from '@/src/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getDb } from '@/src/lib/db/client';

type ErrorResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Tournament | ErrorResponse | undefined>
) {
  const { id } = req.query;
  if (Array.isArray(id) || id == undefined) {
    res.status(400).json({ message: 'bad request' });
  } else {
    res.status(200).json(await getTournament(getDb(), parseInt(id)));
  }
}

async function getTournament(
  db: NodePgDatabase,
  id: number
): Promise<Tournament | undefined> {
  const response = await db
    .select()
    .from(tournaments)
    .where(eq(tournaments.id, id));
  const tourny = response.at(0);
  return tourny
    ? {
        id: tourny.id,
        name: tourny.name,
        size: tourny.size,
        startTime: tourny.startTime,
        status: tournamentStatusFromValue.get(tourny.status)!,
        owner: tourny.owner,
        description: tourny.description,
        logo: tourny.logo,
      }
    : tourny;
}
