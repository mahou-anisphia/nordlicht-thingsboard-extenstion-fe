// src/layouts/MainLayout.tsx
import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen">
      {/* Navbar with sticky positioning */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <Layout>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout
          style={{ marginLeft: collapsed ? 80 : 200 }}
          className="transition-all duration-300"
        >
          <Content
            className="p-6 min-h-[280px] overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 64px)" }} // Adjust for navbar height dynamically
          >
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
