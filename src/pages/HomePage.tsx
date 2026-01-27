import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function HomePage() {
  const role = useAuthStore((s) => s.role);
  const navigate = useNavigate();

  const actions = {
    ADMIN: [
      { label: 'User Management', path: '/admin/users' },
      { label: 'Buildings', path: '/buildings' },
      { label: 'Events Log', path: '/events' },
    ],
    MANAGER: [
      { label: 'My Buildings', path: '/manager/buildings' },
      { label: 'Structure (Floors & Rooms)', path: '/manager/structure' },
      { label: 'Devices', path: '/manager/devices' },
      { label: 'Events', path: '/manager/events' },
    ],
    USER: [{ label: 'Buildings', path: '/buildings' }],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to Building Management System
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Your role: <strong>{role}</strong>
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {actions[role].map((action) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={action.path}>
            <Card>
              <CardActionArea onClick={() => navigate(action.path)}>
                <CardContent>
                  <Typography variant="h6">{action.label}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
