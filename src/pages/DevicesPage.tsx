import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useBeaconStore } from '../stores/beaconStore';
import { useSensorStore } from '../stores/sensorStore';
import { useAuthStore } from '../stores/authStore';
import { useState } from 'react';

export default function DevicesPage() {
  const { buildingId } = useParams<{ buildingId: string }>();
  const role = useAuthStore((s) => s.role);

  const [newBeaconId, setNewBeaconId] = useState('');
  const [newBeaconLocation, setNewBeaconLocation] = useState('');

  const [newSensorId, setNewSensorId] = useState('');
  const [newSensorLocation, setNewSensorLocation] = useState('');

  const allBeacons = useBeaconStore((s) => s.beacons);
  const allSensors = useSensorStore((s) => s.sensors);

  const addBeacon = useBeaconStore((s) => s.addBeacon);
  const deleteBeacon = useBeaconStore((s) => s.deleteBeacon);

  const addSensor = useSensorStore((s) => s.addSensor);
  const deleteSensor = useSensorStore((s) => s.deleteSensor);

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
        <>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              size="small"
              label="Beacon ID"
              value={newBeaconId}
              onChange={(e) => setNewBeaconId(e.target.value)}
            />

            <TextField
              size="small"
              label="Location"
              value={newBeaconLocation}
              onChange={(e) => setNewBeaconLocation(e.target.value)}
            />
          </Box>

          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => {
              if (!newBeaconId) return;

              addBeacon({
                buildingId,
                beaconId: newBeaconId,
                locationDescription: newBeaconLocation,
              });

              setNewBeaconId('');
              setNewBeaconLocation('');
            }}
          >
            Add Beacon
          </Button>
        </>
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
                  <Button
                    size="small"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => deleteBeacon(beacon.id)}
                  >
                    Delete
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
        <>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              size="small"
              label="Sensor ID"
              value={newSensorId}
              onChange={(e) => setNewSensorId(e.target.value)}
            />

            <TextField
              size="small"
              label="Location"
              value={newSensorLocation}
              onChange={(e) => setNewSensorLocation(e.target.value)}
            />
          </Box>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => {
              if (!newSensorId) return;

              addSensor({
                buildingId,
                externalSensorId: newSensorId,
                type: 'SMOKE_DETECTOR', // можешь потом сделать Select
                locationDescription: newSensorLocation,
              });

              setNewSensorId('');
              setNewSensorLocation('');
            }}
          >
            Add Beacon
          </Button>
        </>
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
                  <Button
                    size="small"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => deleteSensor(sensor.id)}
                  >
                    Delete
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
