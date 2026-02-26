/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Typography,
  Chip,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEventStore } from '../stores/eventStore';
import { useAuthStore } from '../stores/authStore';

export default function EventsPage() {
  const events = useEventStore((s) => s.events);
  const addEvent = useEventStore((s) => s.addEvent);
  const role = useAuthStore((s) => s.role);

  const navigate = useNavigate();

  const [openCreate, setOpenCreate] = useState(false);

  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [sensorId, setSensorId] = useState('');
  const [buildingId, setBuildingId] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleCreate = () => {
    addEvent({
      sensorId,
      buildingId,
      location,
      eventType,
      status: 'NEW',
      emailSent,
      reportedAt: new Date().toISOString(),
    });

    setOpenCreate(false);

    // reset form
    setLocation('');
    setEventType('');
    setSensorId('');
    setBuildingId('');
    setEmailSent(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Events</Typography>

        {(role === 'ADMIN' || role === 'MANAGER') && (
          <Button variant="contained" onClick={() => setOpenCreate(true)}>
            Create Event
          </Button>
        )}
      </Box>

      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid key={event.id} size={{ xs: 12, md: 6 }}>
            <Card>
              <CardActionArea onClick={() => navigate(`/events/${event.id}`)}>
                <CardContent>
                  <Typography variant="h6">{event.eventType}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    {event.location}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {new Date(event.reportedAt).toLocaleString()}
                  </Typography>

                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Chip
                      label={event.status}
                      color={
                        event.status === 'NEW'
                          ? 'error'
                          : event.status === 'IN_PROGRESS'
                            ? 'warning'
                            : 'success'
                      }
                    />

                    {event.emailSent && (
                      <Chip label="Email sent" color="info" />
                    )}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
        <DialogTitle>Create Event</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Location"
            margin="normal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <TextField
            fullWidth
            label="Sensor ID"
            margin="normal"
            value={sensorId}
            onChange={(e) => setSensorId(e.target.value)}
          />

          <TextField
            fullWidth
            label="Building ID"
            margin="normal"
            value={buildingId}
            onChange={(e) => setBuildingId(e.target.value)}
          />

          <TextField
            fullWidth
            select
            label="Event Type"
            margin="normal"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <MenuItem value="SMOKE_DETECTED">SMOKE_DETECTED</MenuItem>
            <MenuItem value="BUTTON_PRESSED">BUTTON_PRESSED</MenuItem>
            <MenuItem value="TEMPERATURE_THRESHOLD_EXCEEDED">
              TEMPERATURE_THRESHOLD_EXCEEDED
            </MenuItem>
          </TextField>

          <TextField
            fullWidth
            select
            label="Email Sent"
            margin="normal"
            value={emailSent ? 'true' : 'false'}
            onChange={(e) => setEmailSent(e.target.value === 'true')}
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={!location || !eventType}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
