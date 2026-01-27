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
  isMobile: boolean;
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  drawerWidth,
  isMobile,
  mobileOpen,
  onClose,
}: Props) {
  const navigate = useNavigate();
  const role = useAuthStore((s) => s.role);

  const menuItems = role ? sidebarConfig[role] : [];

  const drawerContent = (
    <>
      <Toolbar />
      <List>
        <ListItemButton
          onClick={() => {
            navigate('/');
            if (isMobile) onClose();
          }}
        >
          <ListItemText primary="Home" />
        </ListItemButton>

        <Divider sx={{ my: 1 }} />

        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            onClick={() => {
              navigate(item.path);
              if (isMobile) onClose();
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

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
      open
    >
      {drawerContent}
    </Drawer>
  );
}
