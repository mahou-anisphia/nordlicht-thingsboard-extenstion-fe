import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/login";
import NotFoundPage from "./pages/notfound";
import Dashboard from "./pages/dashboard";
import DevicesManagementPage from "./pages/devicesManagement";
import User from "./pages/user";
import useAuthStore from "./store/useAuthStore";
import themeConfig from "./theme/themeConfig";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const rehydrate = useAuthStore((state) => state.rehydrate);

  useEffect(() => {
    rehydrate(); // Rehydrate authentication state from localStorage
  }, [rehydrate]);

  return (
    <ConfigProvider theme={themeConfig}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
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
            <Route path="devices" element={<DevicesManagementPage />} />
            {/* <Route path="notfound" element={<NotFoundPage />} /> */}
            {/* Add more routes here */}
          </Route>
          {/* Catch all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
