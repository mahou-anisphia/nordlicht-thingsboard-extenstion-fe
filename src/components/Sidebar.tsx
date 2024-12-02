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
  ProfileOutlined,
} from "@ant-design/icons";
import useDeviceProfileStore from "@/store/useDeviceProfileStore";
import { useEffect } from "react";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { deviceProfiles, fetchDeviceProfiles } = useDeviceProfileStore();

  useEffect(() => {
    fetchDeviceProfiles();
  }, [fetchDeviceProfiles]);

  const deviceProfileSubItems = deviceProfiles.map((profile) => ({
    key: `/device-profile/${profile.id}`,
    icon: <ProfileOutlined />,
    label: profile.name,
  }));

  // Get the selected key based on current path
  const getSelectedKey = (pathname: string) => {
    if (pathname.startsWith("/device/")) {
      return "/devices";
    }
    return pathname;
  };

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
      key: "device-profiles-group",
      icon: <AppstoreOutlined />,
      label: "Device Profiles",
      children: [
        {
          key: "/device-profiles",
          icon: <AppstoreOutlined />,
          label: "All Profiles",
        },
        ...deviceProfileSubItems,
      ],
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
        selectedKeys={[getSelectedKey(location.pathname)]}
        defaultOpenKeys={["device-profiles-group"]}
        items={menuItems}
        onClick={({ key }) => {
          if (!key.startsWith("device-profiles-group")) {
            navigate(key);
          }
        }}
        className="mt-2"
      />
    </Sider>
  );
};

export default Sidebar;
