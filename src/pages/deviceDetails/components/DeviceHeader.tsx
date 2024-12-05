import React from "react";
import { Button, Space, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface DeviceHeaderProps {
  id: string;
  onBack: () => void;
}

const DeviceHeader: React.FC<DeviceHeaderProps> = ({ id, onBack }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <Space>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          className="hover:bg-gray-50"
        />
        <div>
          <Title level={4} className="mb-1">
            Device Details
          </Title>
          <Text className="text-gray-600">ID: {id}</Text>
        </div>
      </Space>
    </div>
  );
};

export default DeviceHeader;
