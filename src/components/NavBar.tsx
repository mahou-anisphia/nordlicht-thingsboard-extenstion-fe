// src/components/Navbar.tsx
import React from "react";
import { Layout, Button } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
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
    <Header className="bg-white px-4 shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        <div className="text-xl font-bold">Your App</div>
        <div className="flex items-center gap-4">
          <span className="hidden md:flex items-center gap-2">
            <UserOutlined />
            {user?.email}
          </span>
          <Button icon={<LogoutOutlined />} onClick={handleLogout} type="text">
            Logout
          </Button>
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
