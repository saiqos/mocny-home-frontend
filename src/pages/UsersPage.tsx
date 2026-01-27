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

  const handleSave = () => {
    if (!firstName || !lastName || !email) return;

    addUser({
      firstName,
      lastName,
      email,
      role: roleValue as any,
      isActive: true,
    });

    setFirstName('');
    setLastName('');
    setEmail('');
    setRoleValue('USER');
    setOpen(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpen(true)}>
        Add User
      </Button>

      <Table>
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
            <TableRow key={user.id}>
              <TableCell>
                {user.firstName} {user.lastName}
              </TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>
                <Select
                  size="small"
                  value={user.role}
                  onChange={(e) => changeRole(user.id, e.target.value as any)}
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
                />
              </TableCell>

              <TableCell>
                <Button size="small" onClick={() => toggleActive(user.id)}>
                  {user.isActive ? 'Block' : 'Unblock'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ADD USER MODAL */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setFirstName('');
          setLastName('');
          setEmail('');
        }}
      >
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
          <Button
            onClick={() => {
              setOpen(false);
              setFirstName('');
              setLastName('');
              setEmail('');
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
