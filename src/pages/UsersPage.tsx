/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TableContainer,
  Paper,
} from '@mui/material';
import { useUserStore } from '../stores/userStore';
import { useState } from 'react';

export default function UsersPage() {
  const users = useUserStore((s) => s.users);
  const addUser = useUserStore((s) => s.addUser);
  const toggleActive = useUserStore((s) => s.toggleActive);
  const changeRole = useUserStore((s) => s.changeRole);

  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [roleValue, setRoleValue] = useState('USER');

  const handleClose = () => {
    setOpen(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setRoleValue('USER');
  };

  const handleSave = () => {
    if (!firstName || !lastName || !email) return;

    addUser({
      firstName,
      lastName,
      email,
      role: roleValue as any,
      isActive: true,
    });

    handleClose();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpen(true)}>
        Add User
      </Button>

      <TableContainer
        component={Paper}
        sx={{
          overflowX: 'auto',
        }}
      >
        <Table
          size="small"
          sx={{
            minWidth: 550,
            '& .MuiTableCell-root': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              py: { xs: 1.5, sm: 1 },
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>

                <TableCell
                  sx={{
                    maxWidth: 160,
                    wordBreak: 'break-word',
                  }}
                >
                  {user.email}
                </TableCell>

                <TableCell>
                  <Select
                    size="small"
                    value={user.role}
                    onChange={(e) => changeRole(user.id, e.target.value as any)}
                    sx={{
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      minWidth: 50,
                    }}
                  >
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                    <MenuItem value="MANAGER">MANAGER</MenuItem>
                    <MenuItem value="USER">USER</MenuItem>
                  </Select>
                </TableCell>

                <TableCell>
                  <Chip
                    label={user.isActive ? 'Active' : 'Blocked'}
                    color={user.isActive ? 'success' : 'error'}
                    size="small"
                    sx={{
                      fontSize: { xs: '0.65rem', sm: '0.75rem' },
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Button
                    size="small"
                    onClick={() => toggleActive(user.id)}
                    sx={{
                      fontSize: { xs: '0.65rem', sm: '0.75rem' },
                      px: { xs: 1, sm: 1.5 },
                    }}
                  >
                    {user.isActive ? 'Block' : 'Unblock'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL WINDOW */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Last Name"
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Select
            fullWidth
            value={roleValue}
            sx={{ mt: 2 }}
            onChange={(e) => setRoleValue(e.target.value)}
          >
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="MANAGER">MANAGER</MenuItem>
            <MenuItem value="USER">USER</MenuItem>
          </Select>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
