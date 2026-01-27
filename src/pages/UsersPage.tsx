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
} from '@mui/material';
import { useUserStore } from '../stores/userStore';
import { useState } from 'react';
import { TextField, Paper } from '@mui/material';

export default function UsersPage() {
  const addUser = useUserStore((s) => s.addUser);

  const [showForm, setShowForm] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [roleValue, setRoleValue] = useState('USER');

  const users = useUserStore((s) => s.users);
  const toggleActive = useUserStore((s) => s.toggleActive);
  const changeRole = useUserStore((s) => s.changeRole);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setShowForm(!showForm)}
      >
        Add User
      </Button>

      {showForm && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            New User
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="First Name"
              size="small"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
              label="Last Name"
              size="small"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <TextField
              label="Email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Select
              size="small"
              value={roleValue}
              onChange={(e) => setRoleValue(e.target.value)}
            >
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="MANAGER">MANAGER</MenuItem>
              <MenuItem value="USER">USER</MenuItem>
            </Select>

            <Button
              variant="contained"
              onClick={() => {
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
                setShowForm(false);
              }}
            >
              Save
            </Button>
          </Box>
        </Paper>
      )}

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
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    </Box>
  );
}
