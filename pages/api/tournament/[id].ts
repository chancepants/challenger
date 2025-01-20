import { NextApiRequest, NextApiResponse } from 'next';
import { Tournament, TournamentStatus } from '@/src/lib/tournaments';

const mockGetTournamentResponse: Tournament = {
  id: '1',
  name: "Chance's House of Horrors",
  size: 16,
  startTime: new Date(Date.now()),
  status: TournamentStatus.NOT_STARTED,
  owner: 'Chance',
  description: "Chance's very first tournament. Come one, come all!",
  logo: 'TODO',
};

const mockGetTournamentResponse2: Tournament = {
  id: '2',
  name: "Mica's Duel to the Death",
  size: 16,
  startTime: new Date(Date.now()),
  status: TournamentStatus.NOT_STARTED,
  owner: 'Mica',
  description: "Mica's awesome tournament!",
  logo: 'TODO',
};

type ErrorResponse = {
  message: string;
};

let tournamentResponseMap = new Map<string, Tournament>();
tournamentResponseMap.set('1', mockGetTournamentResponse);
tournamentResponseMap.set('2', mockGetTournamentResponse2);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Tournament | ErrorResponse | undefined>
) {
  const { id } = req.query;
  if (Array.isArray(id) || id == undefined) {
    res.status(400).json({ message: 'bad request' });
  } else {
    res.status(200).json(tournamentResponseMap.get(id));
  }
}
