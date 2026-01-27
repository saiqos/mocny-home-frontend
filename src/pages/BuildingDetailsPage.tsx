import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useBuildingStore } from '../stores/buildingStore';
import { useFloorStore } from '../stores/floorStore';
import { useAuthStore } from '../stores/authStore';

export default function BuildingDetailsPage() {
  const { buildingId } = useParams<{ buildingId: string }>();
  const role = useAuthStore((s) => s.role);
  const navigate = useNavigate();

  const buildings = useBuildingStore((s) => s.buildings);
  const floorsAll = useFloorStore((s) => s.floors);

  const building = buildings.find((b) => b.id === buildingId);
  const floors = floorsAll.filter((f) => f.buildingId === buildingId);

  if (!buildingId) {
    return <Typography>Invalid building ID</Typography>;
  }

  if (!building) {
    return <Typography>Building not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {building.name}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        {building.address}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Floors
      </Typography>

      {role === 'MANAGER' && (
        <Button variant="contained" sx={{ mb: 2 }}>
          Add Floor
        </Button>
      )}

      <Grid container spacing={2}>
        {floors.map((floor) => (
          <Grid key={floor.id} size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Floor {floor.level}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {floor.description}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Barriers:</strong>{' '}
                  {floor.architecturalBarriers || 'None'}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Notes:</strong> {floor.notes || '—'}
                </Typography>

                {role === 'MANAGER' && (
                  <Button
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() =>
                      navigate(`/buildings/${buildingId}/floors/${floor.id}`)
                    }
                  >
                    Manage Rooms
                  </Button>
                )}

                <Button
                  size="small"
                  sx={{ mt: 2, ml: 2 }}
                  onClick={() => navigate(`/buildings/${buildingId}/devices`)}
                >
                  Devices
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
