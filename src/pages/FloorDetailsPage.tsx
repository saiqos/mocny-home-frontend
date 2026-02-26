import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useFloorStore } from '../stores/floorStore';
import { useRoomStore } from '../stores/roomStore';
import { useAuthStore } from '../stores/authStore';

export default function FloorDetailsPage() {
  const { floorId } = useParams();
  const role = useAuthStore((s) => s.role);

  const floor = useFloorStore((s) => s.floors.find((f) => f.id === floorId));

  const roomsAll = useRoomStore((s) => s.rooms);

  const rooms = roomsAll
    .filter((r) => r.floorId === floorId)
    .slice()
    .sort((a, b) => a.orderOnFloor - b.orderOnFloor);

  const addRoom = useRoomStore((s) => s.addRoom);
  const updateRoom = useRoomStore((s) => s.updateRoom);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [order, setOrder] = useState('');
  const [description, setDescription] = useState('');

  if (!floor) return <Typography>Floor not found</Typography>;

  const handleAddRoom = () => {
    addRoom({
      id: crypto.randomUUID(),
      floorId: floorId!,
      nameOrNumber: name,
      orderOnFloor: Number(order),
      description,
    });

    setOpenAdd(false);
    setName('');
    setOrder('');
    setDescription('');
  };

  const handleEditRoom = () => {
    if (!selectedRoomId) return;

    updateRoom(selectedRoomId, {
      nameOrNumber: name,
      orderOnFloor: Number(order),
      description,
    });

    setOpenEdit(false);
  };

  return (
    <Box>
      <Typography variant="h4">Floor {floor.level}</Typography>
      <Divider sx={{ my: 3 }} />

      <Typography variant="h5">Rooms</Typography>

      {role === 'Manager' && (
        <>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setOpenAdd(true)}
          >
            Add Room
          </Button>

          <Dialog
            open={openAdd}
            onClose={() => {
              setOpenAdd(false);
              setName('');
              setOrder('');
              setDescription('');
            }}
          >
            <DialogTitle>Add Room</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Name / Number"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Order on Floor"
                margin="normal"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              />
              <TextField
                fullWidth
                label="Description"
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenAdd(false);
                  setName('');
                  setOrder('');
                  setDescription('');
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddRoom} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      <Grid container spacing={2}>
        {rooms.map((room) => (
          <Grid key={room.id} size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">{room.nameOrNumber}</Typography>
                <Typography>Order: {room.orderOnFloor}</Typography>
                <Typography>{room.description}</Typography>

                {role === 'Manager' && (
                  <Button
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() => {
                      setSelectedRoomId(room.id);
                      setName(room.nameOrNumber);
                      setOrder(String(room.orderOnFloor));
                      setDescription(room.description ?? '');
                      setOpenEdit(true);
                    }}
                  >
                    Edit
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Room</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name / Number"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Order on Floor"
            margin="normal"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEditRoom} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
