import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useBuildingStore } from '../stores/buildingStore';
import { useFloorStore } from '../stores/floorStore';
import { useAuthStore } from '../stores/authStore';

export default function BuildingDetailsPage() {
  const { buildingId } = useParams<{ buildingId: string }>();
  const role = useAuthStore((s) => s.role);
  const navigate = useNavigate();

  const buildings = useBuildingStore((s) => s.buildings);
  const floorsAll = useFloorStore((s) => s.floors);
  const addFloor = useFloorStore((s) => s.addFloor);

  const building = buildings.find((b) => b.id === buildingId);
  const floors = floorsAll.filter((f) => f.buildingId === buildingId);

  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');

  if (!building) return <Typography>Building not found</Typography>;

  const handleAddFloor = () => {
    addFloor({
      id: crypto.randomUUID(),
      buildingId: buildingId!,
      level: Number(level),
      description,
      notes: '',
      architecturalBarriers: '',
    });

    setOpen(false);
    setLevel('');
    setDescription('');
  };

  return (
    <Box>
      <Typography variant="h4">{building.name}</Typography>
      <Typography variant="subtitle1">{building.address}</Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5">Floors</Typography>

      {role === 'Manager' && (
        <>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setOpen(true)}
          >
            Add Floor
          </Button>

          <Dialog
            open={open}
            onClose={() => {
              setOpen(false);
              setDescription('');
              setLevel('');
            }}
          >
            <DialogTitle>Add Floor</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Level"
                margin="normal"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
              <TextField
                fullWidth
                label="Description"
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpen(false);
                  setDescription('');
                  setLevel('');
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddFloor} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      <Grid container spacing={2}>
        {floors.map((floor) => (
          <Grid key={floor.id} size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Floor {floor.level}</Typography>
                <Typography>{floor.description}</Typography>

                <Button
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={() =>
                    navigate(`/buildings/${buildingId}/floors/${floor.id}`)
                  }
                >
                  Manage Rooms
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
