export enum TournamentStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  COMPLETE = 'Complete',
}

export type ListTournamentEntry = {
  id: string;
  name: string;
  size: number;
  startTime: Date;
  status: TournamentStatus;
};

export type Tournament = {
  id: string;
  name: string;
  size: number;
  startTime: Date;
  status: TournamentStatus;
  owner: string;
  description: string;
  logo: string; // TODO: this should be an img we get back
};

// TODO should probably figure out my data model... Entrant == USER???
export type Entrant = {
  id: string;
  name: string;
  avatar: string;
  seed: number;
};

export type ListTournamentsResponse = {
  tournaments: ListTournamentEntry[];
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

export async function listTournaments(): Promise<ListTournamentsResponse> {
  const response = await fetch('/api/tournaments');
  return response.json();
}

export async function getTournament(
  id: string
): Promise<Tournament | undefined> {
  const response = await fetch(`/api/tournament/${id}`);
  return response.json();
}

export function listEntrants(id: string): Entrant[] {
  return mockListEntrantsResponse;
}
