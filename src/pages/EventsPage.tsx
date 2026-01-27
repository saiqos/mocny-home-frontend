import {
  Box,
  Typography,
  Chip,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useEventStore } from '../stores/eventStore';

export default function EventsPage() {
  const events = useEventStore((s) => s.events);
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Events
      </Typography>

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
    </Box>
  );
}
