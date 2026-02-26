import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Alert,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { loginRequest } from '../services/authService';
import { useState } from 'react';
import type { Role } from '../models/Role';

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await loginRequest(username, password);

      login({
        token: res.token,
        username: res.username,
        role: res.roles[0] as Role,
      });

      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          disabled={!username || !password || loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        {/* Divider */}
        <Divider sx={{ my: 3 }} />

        {/* Register Button */}
        <Button
          fullWidth
          variant="outlined"
          onClick={() => navigate('/register')}
        >
          Don’t have an account? Register
        </Button>
      </Paper>
    </Box>
  );
}
