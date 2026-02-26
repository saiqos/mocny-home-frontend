import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { registerRequest } from '../services/authService';
import { useState } from 'react';
import type { Role } from '../models/Role';

export default function RegisterPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await registerRequest(username, email, password);

      login({
        token: res.token,
        username: res.username,
        role: res.roles[0] as Role,
      });

      navigate('/');
    } catch (err) {
      setError('Registration failed');
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
          Register
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
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleRegister}
          disabled={!username || !email || !password || loading}
        >
          {loading ? 'Creating account...' : 'Register'}
        </Button>

        <Button fullWidth sx={{ mt: 2 }} onClick={() => navigate('/login')}>
          Already have an account? Login
        </Button>
      </Paper>
    </Box>
  );
}
