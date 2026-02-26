import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function HomePage() {
  const role = useAuthStore((s) => s.role);
  const navigate = useNavigate();

  const actions = {
    Admin: [
      { label: 'User Management', path: '/admin/users' },
      { label: 'Buildings', path: '/buildings' },
      { label: 'Events Log', path: '/events' },
    ],
    Manager: [
      { label: 'Buildings', path: '/buildings' },
      { label: 'Events', path: '/events' },
    ],
    User: [{ label: 'Buildings', path: '/buildings' }],
  };

  const availableActions = role ? actions[role] : [];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to Building Management System
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Your role: <strong>{role ?? '—'}</strong>
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {availableActions.map((action) => (
          <Grid key={action.path} size={{ xs: 12, sm: 6, md: 4 }}>
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
