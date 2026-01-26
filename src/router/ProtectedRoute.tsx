import { Navigate } from 'react-router-dom';
import type { Role } from '../models/Role';
import { useAuthStore } from '../stores/authStore';

interface Props {
  allowedRoles: Role[];
  children: React.ReactNode;
}

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const role = useAuthStore((s) => s.role);

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
