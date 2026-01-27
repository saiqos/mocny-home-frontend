import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useBeaconStore } from '../stores/beaconStore';
import { useSensorStore } from '../stores/sensorStore';
import { useAuthStore } from '../stores/authStore';

export default function DevicesPage() {
  const { buildingId } = useParams<{ buildingId: string }>();
  const role = useAuthStore((s) => s.role);

  const allBeacons = useBeaconStore((s) => s.beacons);
  const allSensors = useSensorStore((s) => s.sensors);

  const beacons = allBeacons.filter((b) => b.buildingId === buildingId);

  const sensors = allSensors.filter((s) => s.buildingId === buildingId);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Devices
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Beacons
      </Typography>

      {role !== 'USER' && (
        <Button variant="contained" sx={{ mb: 2 }}>
          Add Beacon
        </Button>
      )}

      <Grid container spacing={2}>
        {beacons.map((beacon) => (
          <Grid key={beacon.id} size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">{beacon.beaconId}</Typography>
                <Typography variant="body2">
                  {beacon.locationDescription}
                </Typography>

                {role !== 'USER' && (
                  <Button size="small" sx={{ mt: 2 }}>
                    Edit
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Sensors
      </Typography>

      {role !== 'USER' && (
        <Button variant="contained" sx={{ mb: 2 }}>
          Add Sensor
        </Button>
      )}

      <Grid container spacing={2}>
        {sensors.map((sensor) => (
          <Grid key={sensor.id} size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">{sensor.externalSensorId}</Typography>

                <Chip label={sensor.type} sx={{ mt: 1, mb: 1 }} />

                <Typography variant="body2">
                  {sensor.locationDescription}
                </Typography>

                {role !== 'USER' && (
                  <Button size="small" sx={{ mt: 2 }}>
                    Edit
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
