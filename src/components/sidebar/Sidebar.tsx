import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { sidebarConfig } from './sidebarConfig';

export default function Sidebar() {
  const navigate = useNavigate();
  const role = useAuthStore((s) => s.role);

  return (
    <Drawer variant="permanent">
      <List>
        {sidebarConfig[role].map((item) => (
          <ListItemButton key={item.path} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
