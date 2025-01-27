export enum TournamentStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  COMPLETE = 'Complete',
}

export enum TournamentQueryKey {
  TOURNAMENTS = 'tournaments',
}

export const tournamentStatusFromValue = new Map<string, TournamentStatus>([
  ['Not Started', TournamentStatus.NOT_STARTED],
  ['In Progress', TournamentStatus.IN_PROGRESS],
  ['Complete', TournamentStatus.COMPLETE],
]);

export type Tournament = {
  id: number;
  name: string;
  size: number;
  startTime: Date;
  status: TournamentStatus;
  owner: string;
  description: string;
  logo: string; // location of file -- hmm can load rest of page faster but logo coming late is weird
};

// TODO should probably figure out my data model... Entrant == USER???
export type Entrant = {
  id: string;
  name: string;
  avatar: string;
  seed: number;
};

const mockListEntrantsResponse: Entrant[] = [
  {
    id: '1',
    name: 'chance',
    avatar: 'todo',
    seed: 1,
  },
  {
    id: '2',
    name: 'mica',
    avatar: 'todo',
    seed: 2,
  },
];

export function listEntrants(id: number): Entrant[] {
  return mockListEntrantsResponse;
}
