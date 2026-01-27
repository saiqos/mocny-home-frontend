import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { sidebarConfig } from './sidebarConfig';

interface Props {
  drawerWidth: number;
}

export default function Sidebar({ drawerWidth }: Props) {
  const navigate = useNavigate();
  const role = useAuthStore((s) => s.role);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />

      <List>
        {/* Home button */}
        <ListItemButton onClick={() => navigate('/')}>
          <ListItemText primary="Home" />
        </ListItemButton>

        <Divider sx={{ my: 1 }} />

        {sidebarConfig[role].map((item) => (
          <ListItemButton key={item.path} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
