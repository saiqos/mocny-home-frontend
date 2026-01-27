import {
  Box,
  Typography,
  Button,
  Paper,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { useAuthStore } from '../stores/authStore';
import { useState } from 'react';

export default function LoginPage() {
  const users = useUserStore((s) => s.users);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const [selectedUserId, setSelectedUserId] = useState('');

  const selectedUser = users.find((u) => u.id === selectedUserId);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper sx={{ p: 4, minWidth: 300 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <Select
          fullWidth
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          displayEmpty
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>
            Select user
          </MenuItem>

          {users
            .filter((u) => u.isActive)
            .map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.firstName} {user.lastName} ({user.role})
              </MenuItem>
            ))}
        </Select>

        <Button
          fullWidth
          variant="contained"
          disabled={!selectedUser}
          onClick={() => {
            if (!selectedUser) return;

            login(selectedUser.id, selectedUser.role);
            navigate('/');
          }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
