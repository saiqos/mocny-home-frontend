import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid';
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
    .sort((a, b) => a.orderOnFloor - b.orderOnFloor);

  if (!floor) {
    return <Typography>Floor not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Floor {floor.level}
      </Typography>

      <Typography variant="body1">{floor.description}</Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Rooms
      </Typography>

      {role === 'MANAGER' && (
        <Button variant="contained" sx={{ mb: 2 }}>
          Add Room
        </Button>
      )}

      <Grid container spacing={2}>
        {rooms.map((room) => (
          <Grid key={room.id} size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">{room.nameOrNumber}</Typography>

                <Typography variant="body2" color="text.secondary">
                  Order on floor: {room.orderOnFloor}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  {room.description}
                </Typography>

                {role === 'MANAGER' && (
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
