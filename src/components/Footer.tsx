// src/components/Footer.tsx
import React from "react";
import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter className="text-center bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-600">
          ©{new Date().getFullYear()} Your App. All rights reserved.
        </p>
      </div>
    </AntFooter>
  );
};

export default Footer;
