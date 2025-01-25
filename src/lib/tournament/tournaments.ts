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

export type ListTournamentEntry = {
  id: number;
  name: string;
  size: number;
  startTime: Date;
  status: TournamentStatus;
};

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

export type CreateTournamentProps = {
  name: string;
  size: number;
  startTime: Date;
  description: string;
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
  id: number
): Promise<Tournament | undefined> {
  const response = await fetch(`/api/tournament/${id}`);
  return response.json();
}

export async function createTournament(
  props: CreateTournamentProps
): Promise<Tournament> {
  return (
    await fetch(`/api/tournaments`, {
      method: 'POST',
      body: JSON.stringify({
        name: props.name,
        size: props.size,
        startTime: props.startTime,
        description: props.description,
      }),
    })
  ).json();
}

export function listEntrants(id: number): Entrant[] {
  return mockListEntrantsResponse;
}
