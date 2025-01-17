import {
  listTournaments,
  getTournament,
  listEntrants,
  Tournament,
} from '@/src/lib/tournaments';
import { Box, Grid2,  Typography } from '@mui/material';
import {
  DataGrid,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import palm from '@/public/transparent-palm.png';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

// TODO prefetch all cheap tournament content for the loaded page - fixed cache size
export default function Tournaments() {
  const tournaments = listTournaments();
  const [selectedTournament, setSelectedTournament] = useState<
    string | undefined
  >(tournaments.tournaments.at(0)?.id);
  return (
    <Grid2 container spacing={4} paddingTop={4}>
      <Grid2 size={6}>
        <DataGrid
          rows={tournaments.tournaments}
          columns={[
            {
              field: 'name',
              headerName: 'Name',
              width: 350,
            },
            {
              field: 'size',
              headerName: 'Entrants',
              width: 150,
            },
            {
              field: 'status',
              headerName: 'Status',
              width: 150,
            },
            {
              field: 'startTime',
              headerName: 'Start Time',
              width: 450,
            },
          ]}
          onRowSelectionModelChange={(
            rowSelectionModel: GridRowSelectionModel
          ) => {
            setSelectedTournament(rowSelectionModel.at(0)?.toString());
          }}
          disableMultipleRowSelection
          rowSelectionModel={selectedTournament}
        />
      </Grid2>
      <Grid2 size={6}>
        <TournamentView id={selectedTournament} />
      </Grid2>
    </Grid2>
  );
}

type TournamentProps = {
  id: string | undefined;
};

function TournamentView({ id }: TournamentProps) {
  let tournament: Tournament | undefined;
  if (id == undefined || (tournament = getTournament(id)) == undefined) {
    return null;
  }
  return (
    <Box sx={{ p: 4, border: 1 }}>
      <Typography variant="h5" className="text-center">
        {tournament.name}
      </Typography>
      <Typography className="text-center">{tournament.description}</Typography>
      <Image src={palm} alt="tournament logo" width={100} height={200} />
      <Grid2 container spacing={4} paddingTop={4}>
        <Grid2 size={6}>
          <DataGrid
            rows={listEntrants(tournament.id)}
            columns={[
              {
                field: 'name',
                headerName: 'Entrant',
                width: 350,
                renderCell(params) {
                  return (
                    <Link href={`/users/${params.row.id}`}>
                      {params.row.name}
                    </Link>
                  );
                },
              },
              {
                field: 'seed',
                headerName: 'Seed',
                width: 100,
              },
            ]}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}
