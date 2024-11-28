// src/components/Navbar.tsx
import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  LogoutOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const { Header } = Layout;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        <div className="flex items-center">
          <h1 className="text-xl font-bold mr-8">Your App</h1>
          <Menu mode="horizontal" className="border-0">
            <Menu.Item
              key="dashboard"
              icon={<DashboardOutlined />}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              key="profile"
              icon={<UserOutlined />}
              onClick={() => navigate("/profile")}
            >
              Profile
            </Menu.Item>
          </Menu>
        </div>
        <div className="flex items-center">
          <span className="mr-4">{user?.email}</span>
          <Button icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
