import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/login";
import SignInPage from "@/pages/signin";
import NotFoundPage from "@/pages/notfound";
import Dashboard from "@/pages/dashboard";
import DevicesManagementPage from "@/pages/devicesManagement";
import DeviceProfilePage from "@/pages/deviceProfile";
import DeviceProfileDetailPage from "@/pages/deviceProfileDetails";
import DeviceDetailPage from "@/pages/deviceDetails";
import User from "@/pages/user";
import SettingsPage from "@/pages/settings";
import ProfilePage from "@/pages/profile";
import MainLayout from "@/layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import useAuthStore from "@/store/useAuthStore";

const AppRoutes: React.FC = () => {
  const { uiPreference } = useAuthStore();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          uiPreference === "old" ? (
            <LoginPage />
          ) : (
            <Navigate to="/signin" replace />
          )
        }
      />
      <Route
        path="/signin"
        element={
          uiPreference === "new" ? (
            <SignInPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Protected Routes with MainLayout */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<User />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="devices" element={<DevicesManagementPage />} />
        <Route path="device/:id" element={<DeviceDetailPage />} />
        <Route path="device-profiles" element={<DeviceProfilePage />} />
        <Route
          path="device-profile/:id"
          element={<DeviceProfileDetailPage />}
        />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
