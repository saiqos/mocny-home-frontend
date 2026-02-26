import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './router/ProtectedRoute';

import HomePage from './pages/HomePage';
import BuildingsPage from './pages/BuildingsPage';
import BuildingDetailsPage from './pages/BuildingDetailsPage';
import FloorDetailsPage from './pages/FloorDetailsPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import DevicesPage from './pages/DevicesPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GuestRoute from './router/GuestRoute';

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />

      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Manager', 'User']}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buildings"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Manager', 'User']}>
              <BuildingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buildings/:buildingId"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Manager', 'User']}>
              <BuildingDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buildings/:buildingId/floors/:floorId"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Manager', 'User']}>
              <FloorDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buildings/:buildingId/devices"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Manager', 'User']}>
              <DevicesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
              <EventsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/:id"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
              <EventDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <UsersPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
