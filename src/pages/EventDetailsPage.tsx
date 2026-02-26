import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Divider } from '@mui/material';
import { useEventStore } from '../stores/eventStore';
import { useAuthStore } from '../stores/authStore';

export default function EventDetailsPage() {
  const { id } = useParams();
  const role = useAuthStore((s) => s.role);
  const { events, updateStatus } = useEventStore();

  const event = events.find((e) => e.id === id);

  if (!event) {
    return <Typography>Event not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Event Details
      </Typography>

      <Typography variant="h6">{event.eventType}</Typography>

      <Typography sx={{ mt: 1 }}>
        <strong>Location:</strong> {event.location}
      </Typography>

      <Typography sx={{ mt: 1 }}>
        <strong>Reported at:</strong>{' '}
        {new Date(event.reportedAt).toLocaleString()}
      </Typography>

      <Typography sx={{ mt: 1 }}>
        <strong>Status:</strong> {event.status}
      </Typography>

      <Typography sx={{ mt: 1 }}>
        <strong>Email sent:</strong> {event.emailSent ? 'Yes' : 'No'}
      </Typography>

      <Divider sx={{ my: 3 }} />

      {(role === 'Admin' || role === 'Manager') &&
        event.status !== 'RESOLVED' && (
          <Button
            variant="contained"
            onClick={() => updateStatus(event.id, 'RESOLVED')}
          >
            Mark as Resolved
          </Button>
        )}
    </Box>
  );
}
