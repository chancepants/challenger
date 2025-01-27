import {
  listEntrants,
  Tournament,
  TournamentQueryKey,
} from '@/src/lib/tournament/tournaments';
import {
  Box,
  Button,
  Grid2,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import palm from '@/public/transparent-palm.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/src/utils/api';

// TODO prefetch all cheap tournament content for the loaded page - fixed cache size
export default function Tournaments() {
  const [selectedTournament, setSelectedTournament] = useState<
    number | undefined
  >(undefined);
  const { isPending, isError, data, error } = useQuery({
    queryKey: [TournamentQueryKey.TOURNAMENTS],
    queryFn: async () => api.tournament.list.query(),
  });

  useEffect(() => {
    if (!isPending) {
      setSelectedTournament(data?.at(0)?.id);
    }
  }, [data]);

  if (isPending) {
    return <span>Loading...</span>;
  }
  return (
    <div>
      <CreateTournamentModal />
      <Grid2
        container
        spacing={4}
        paddingTop={2}
        paddingLeft={12}
        paddingRight={12}
      >
        <Grid2 size={6}>
          <DataGrid
            rows={data}
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
        </Grid2>
        <Grid2 size={6}>
          <TournamentView id={selectedTournament} />
        </Grid2>
      </Grid2>
    </div>
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
    queryFn: async () => api.tournament.getById.query({ id: id }),
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

const style = {
  position: 'absolute',
  top: '25%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// TODO: datetime picker for start time
function CreateTournamentModal() {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [startTime, setStartTime] = useState('');
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();
  const addTournamentMutation = useMutation({
    mutationFn: api.tournament.create.mutate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TournamentQueryKey.TOURNAMENTS],
      });
    },
  });
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="text" onClick={() => setOpen(true)}>
        Create Tournament
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <TextField
            id="name"
            label="name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="size"
            label="size"
            variant="outlined"
            onChange={(e) => setSize(e.target.value)}
          />
          <TextField
            id="start-time"
            label="start time"
            variant="outlined"
            onChange={(e) => setStartTime(e.target.value)}
          />
          <TextField
            id="description"
            label="description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variant="text"
            onClick={() =>
              addTournamentMutation.mutate({
                name: name,
                size: parseInt(size),
                startTime: new Date(parseInt(startTime)),
                description: description,
              })
            }
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
