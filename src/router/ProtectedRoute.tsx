import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import type { Role } from '../models/Role';

interface Props {
  allowedRoles: Role[];
  children: React.JSX.Element;
}

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const role = useAuthStore((s) => s.role);

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
