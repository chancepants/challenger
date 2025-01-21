import {
  listTournaments,
  getTournament,
  listEntrants,
  Tournament,
  createTournament,
} from '@/src/lib/tournaments';
import { Box, Button, Grid2, Typography } from '@mui/material';
import {
  DataGrid,
  GridRowParams,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import palm from '@/public/transparent-palm.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// TODO prefetch all cheap tournament content for the loaded page - fixed cache size
export default function Tournaments() {
  const [selectedTournament, setSelectedTournament] = useState<
    number | undefined
  >(undefined);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['tournaments'],
    queryFn: listTournaments,
  });

  useEffect(() => {
    if (!isPending) {
      setSelectedTournament(data?.tournaments.at(0)?.id);
    }
  }, [data]);

  if (isPending) {
    return <span>Loading...</span>;
  }
  return (
    <Grid2
      container
      spacing={4}
      paddingTop={4}
      paddingLeft={12}
      paddingRight={12}
    >
      <Grid2 size={6}>
        <DataGrid
          rows={data?.tournaments}
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
          onRowClick={(gridRowParams: GridRowParams<Tournament>) => {
            setSelectedTournament(gridRowParams.row.id);
          }}
          disableMultipleRowSelection
          rowSelectionModel={selectedTournament}
        />
        <Button
          variant="text"
          onClick={() => {
            createTournament();
          }}
        >
          Create Tournament
        </Button>
      </Grid2>
      <Grid2 size={6}>
        <TournamentView id={selectedTournament} />
      </Grid2>
    </Grid2>
  );
}

type TournamentProps = {
  id: number | undefined;
};

function TournamentView({ id }: TournamentProps) {
  if (id == undefined) {
    return null;
  }
  const { isPending, isError, data, error } = useQuery({
    queryKey: [id],
    queryFn: () => getTournament(id),
  });

  if (data == undefined) {
    return null;
  }

  return (
    <Box sx={{ p: 4, border: 1 }}>
      <Typography variant="h5" className="text-center">
        {data?.name}
      </Typography>
      <Typography className="text-center">{data?.description}</Typography>
      <Image src={palm} alt="tournament logo" width={100} height={200} />
      <Grid2 container spacing={4} paddingTop={4}>
        <Grid2 size={6}>
          <DataGrid
            rows={listEntrants(data.id)}
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
