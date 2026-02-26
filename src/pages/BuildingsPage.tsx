/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useBuildingStore } from '../stores/buildingStore';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';

export default function BuildingsPage() {
  const buildings = useBuildingStore((s) => s.buildings);
  const updateBuilding = useBuildingStore((s) => s.updateBuilding);
  const archiveBuilding = useBuildingStore((s) => s.archiveBuilding);
  const assignManager = useBuildingStore((s) => s.assignManager);
  const removeManager = useBuildingStore((s) => s.removeManager);

  const role = useAuthStore((s) => s.role);
  const navigate = useNavigate();

  const users = useUserStore((s) => s.users);
  const managers = users.filter((u) => u.role === 'Manager');

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editAddress, setEditAddress] = useState('');

  const handleOpenEdit = (building: any) => {
    setSelectedId(building.id);
    setEditName(building.name);
    setEditAddress(building.address);
    setOpenEdit(true);
  };

  const handleSave = () => {
    if (!selectedId) return;

    updateBuilding(selectedId, {
      name: editName,
      address: editAddress,
    });

    setOpenEdit(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Buildings
      </Typography>

      <Grid container spacing={2}>
        {buildings.map((building) => (
          <Grid key={building.id} size={{ xs: 12, md: 6, lg: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">{building.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {building.address}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {building.description}
                </Typography>

                {role === 'Admin' && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Managers:</Typography>

                    {building.managerIds.map((managerId) => {
                      const manager = managers.find((m) => m.id === managerId);
                      if (!manager) return null;

                      return (
                        <Chip
                          key={manager.id}
                          label={`${manager.firstName} ${manager.lastName}`}
                          onDelete={() =>
                            removeManager(building.id, manager.id)
                          }
                          sx={{ mr: 1, mt: 1 }}
                        />
                      );
                    })}

                    <Select
                      size="small"
                      displayEmpty
                      value=""
                      sx={{ mt: 2, minWidth: 200 }}
                      onChange={(e) =>
                        assignManager(building.id, e.target.value as string)
                      }
                    >
                      <MenuItem value="" disabled>
                        Assign manager
                      </MenuItem>

                      {managers
                        .filter((m) => !building.managerIds.includes(m.id))
                        .map((manager) => (
                          <MenuItem key={manager.id} value={manager.id}>
                            {manager.firstName} {manager.lastName}
                          </MenuItem>
                        ))}
                    </Select>
                  </Box>
                )}
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(`/buildings/${building.id}`)}
                >
                  View
                </Button>

                {role === 'Admin' && (
                  <>
                    <Button
                      size="small"
                      onClick={() => handleOpenEdit(building)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      color="error"
                      onClick={() => archiveBuilding(building.id)}
                    >
                      Archive
                    </Button>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* EDIT MODAL */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Building</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Address"
            margin="normal"
            value={editAddress}
            onChange={(e) => setEditAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
