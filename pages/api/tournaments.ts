import {
  ListTournamentsResponse,
  TournamentStatus,
} from '@/src/lib/tournaments';
import { NextApiRequest, NextApiResponse } from 'next';

let mockListTournamentsResponse: ListTournamentsResponse = {
  tournaments: [
    {
      id: '1',
      name: "Chance's House of Horrors",
      size: 16,
      startTime: new Date(1737342424),
      status: TournamentStatus.NOT_STARTED,
    },
    {
      id: '2',
      name: "Mica's Duel to the Death",
      size: 16,
      startTime: new Date(1737342424),
      status: TournamentStatus.NOT_STARTED,
    },
  ],
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListTournamentsResponse>
) {
  res.status(200).json(mockListTournamentsResponse);
}
