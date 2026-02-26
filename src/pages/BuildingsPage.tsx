import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useBuildingStore } from '../stores/buildingStore';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function BuildingsPage() {
  const buildings = useBuildingStore((s) => s.buildings);
  const fetchBuildings = useBuildingStore((s) => s.fetchBuildings);
  const createBuilding = useBuildingStore((s) => s.createBuilding);
  const loading = useBuildingStore((s) => s.loading);
  const error = useBuildingStore((s) => s.error);

  const role = useAuthStore((s) => s.role);
  const navigate = useNavigate();

  const [openCreate, setOpenCreate] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetchBuildings();
  }, []);

  const handleCreate = async () => {
    if (!newName.trim()) return;

    await createBuilding(newName);
    setNewName('');
    setOpenCreate(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Buildings
      </Typography>

      {role === 'Admin' && (
        <Button
          variant="contained"
          sx={{ mb: 3 }}
          onClick={() => setOpenCreate(true)}
        >
          Add Building
        </Button>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Grid container spacing={2}>
          {buildings.map((building) => (
            <Grid key={building.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{building.name}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    ID: {building.id}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Floors: {building.floors?.length ?? 0}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(`/buildings/${building.id}`)}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
        <DialogTitle>Create Building</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Building name"
            margin="normal"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
