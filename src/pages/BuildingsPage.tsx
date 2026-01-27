import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useBuildingStore } from '../stores/buildingStore';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { Select, MenuItem, Chip, Box as MuiBox } from '@mui/material';

export default function BuildingsPage() {
  const buildings = useBuildingStore((s) => s.buildings);
  const role = useAuthStore((s) => s.role);
  const navigate = useNavigate();
  const users = useUserStore((s) => s.users);
  const managers = users.filter((u) => u.role === 'MANAGER');
  const assignManager = useBuildingStore((s) => s.assignManager);
  const removeManager = useBuildingStore((s) => s.removeManager);

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
                {role === 'ADMIN' && (
                  <MuiBox sx={{ mt: 2 }}>
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
                  </MuiBox>
                )}
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(`/buildings/${building.id}`)}
                >
                  View
                </Button>

                {role === 'ADMIN' && (
                  <>
                    <Button size="small">Edit</Button>
                    <Button size="small" color="error">
                      Archive
                    </Button>
                  </>
                )}

                {role === 'MANAGER' && (
                  <Button size="small">Manage Structure</Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
