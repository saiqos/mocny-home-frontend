import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import Sidebar from '../sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function MainLayout() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const role = useAuthStore((s) => s.role);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar drawerWidth={drawerWidth} />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
          }}
        >
          <Toolbar>
            <Typography variant="h6">
              Building Management System — {role}
            </Typography>
            <Button
              color="inherit"
              sx={{ ml: 'auto' }}
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar /> {/* отступ под AppBar */}
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
