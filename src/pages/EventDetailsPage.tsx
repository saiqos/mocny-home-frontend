/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { useEventStore } from '../stores/eventStore';
import { useAuthStore } from '../stores/authStore';

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const role = useAuthStore((s) => s.role);
  const { events, updateStatus, updateEvent, deleteEvent } = useEventStore();

  const event = events.find((e) => e.id === id);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editLocation, setEditLocation] = useState('');
  const [editEventType, setEditEventType] = useState('');
  const [editStatus, setEditStatus] = useState<
    'NEW' | 'IN_PROGRESS' | 'RESOLVED'
  >('NEW');
  const [editEmailSent, setEditEmailSent] = useState(false);

  if (!event) {
    return <Typography>Event not found</Typography>;
  }

  const handleOpenEdit = () => {
    setEditLocation(event.location);
    setEditEventType(event.eventType);
    setEditStatus(event.status);
    setEditEmailSent(event.emailSent);
    setOpenEdit(true);
  };

  const handleSave = () => {
    updateEvent(event.id, {
      location: editLocation,
      eventType: editEventType,
      status: editStatus,
      emailSent: editEmailSent,
    });

    setOpenEdit(false);
  };

  const handleConfirmDelete = () => {
    deleteEvent(event.id);
    navigate('/events');
  };

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

      {(role === 'ADMIN' || role === 'MANAGER') && (
        <Box sx={{ display: 'flex', gap: 2 }}>
          {event.status !== 'RESOLVED' && (
            <Button
              variant="contained"
              color="warning"
              onClick={() => updateStatus(event.id, 'RESOLVED')}
            >
              Mark as Resolved
            </Button>
          )}

          <Button variant="outlined" onClick={handleOpenEdit}>
            Edit
          </Button>

          {role === 'ADMIN' && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenDelete(true)}
            >
              Delete
            </Button>
          )}
        </Box>
      )}

      {/* EDIT MODAL */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Location"
            margin="normal"
            value={editLocation}
            onChange={(e) => setEditLocation(e.target.value)}
          />

          <TextField
            fullWidth
            select
            label="Event Type"
            margin="normal"
            value={editEventType}
            onChange={(e) => setEditEventType(e.target.value)}
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
            label="Status"
            margin="normal"
            value={editStatus}
            onChange={(e) =>
              setEditStatus(
                e.target.value as 'NEW' | 'IN_PROGRESS' | 'RESOLVED',
              )
            }
          >
            <MenuItem value="NEW">NEW</MenuItem>
            <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
            <MenuItem value="RESOLVED">RESOLVED</MenuItem>
          </TextField>

          <TextField
            fullWidth
            select
            label="Email Sent"
            margin="normal"
            value={editEmailSent ? 'true' : 'false'}
            onChange={(e) => setEditEmailSent(e.target.value === 'true')}
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRMATION MODAL */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this event?</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
