import React from "react";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  LaptopOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/users",
      icon: <TeamOutlined />,
      label: "Users",
    },
    {
      key: "/devices",
      icon: <LaptopOutlined />,
      label: "Devices",
    },
    {
      key: "/device-profiles",
      icon: <AppstoreOutlined />,
      label: "Device Profiles",
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 64,
        bottom: 0,
      }}
      width={200}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        className="mt-2"
      />
    </Sider>
  );
};

export default Sidebar;
