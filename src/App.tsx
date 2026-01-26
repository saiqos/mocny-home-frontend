import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './router/ProtectedRoute';

import Page from './pages/Page';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<MainLayout />}>
        {/* ADMIN */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Page title="User Management" />
            </ProtectedRoute>
          }
        />

        {/* MANAGER */}
        <Route
          path="/manager/buildings"
          element={
            <ProtectedRoute allowedRoles={['MANAGER']}>
              <Page title="My Buildings" />
            </ProtectedRoute>
          }
        />

        {/* USER */}
        <Route
          path="/buildings"
          element={
            <ProtectedRoute allowedRoles={['USER', 'MANAGER', 'ADMIN']}>
              <Page title="Buildings" />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
