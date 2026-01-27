import { Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buildings"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
              <BuildingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buildings/:buildingId"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
              <BuildingDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buildings/:buildingId/floors/:floorId"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
              <FloorDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buildings/:buildingId/devices"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
              <DevicesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']}>
              <EventsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/:id"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']}>
              <EventDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <UsersPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
