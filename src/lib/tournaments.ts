enum TournamentStatus {
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

let mockListTournamentsResponse: ListTournamentsResponse = {
  tournaments: [
    {
      id: '1',
      name: "Chance's House of Horrors",
      size: 16,
      startTime: new Date(Date.now()),
      status: TournamentStatus.NOT_STARTED,
    },
    {
      id: '2',
      name: "Mica's Duel to the Death",
      size: 16,
      startTime: new Date(Date.now()),
      status: TournamentStatus.NOT_STARTED,
    },
  ],
};

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
  id: '1',
  name: "Mica's Duel to the Death",
  size: 16,
  startTime: new Date(Date.now()),
  status: TournamentStatus.NOT_STARTED,
  owner: 'Mica',
  description: "Mica's awesome tournament!",
  logo: 'TODO',
};

let tournamentResponseMap = new Map<string, Tournament>();
tournamentResponseMap.set('1', mockGetTournamentResponse);
tournamentResponseMap.set('2', mockGetTournamentResponse2);

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

export function listTournaments(): ListTournamentsResponse {
  return mockListTournamentsResponse;
}

export function getTournament(id: string): Tournament | undefined {
  return tournamentResponseMap.get(id);
}

export function listEntrants(id: string): Entrant[] {
  return mockListEntrantsResponse;
}
