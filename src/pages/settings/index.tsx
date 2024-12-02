import React from "react";
import { Card, Typography, Button, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

const { Title, Text } = Typography;

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6">
      <Card className="shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
              className="hover:bg-gray-50"
            />
            <div>
              <Title level={4} className="mb-1">
                Settings
              </Title>
              <Text className="text-gray-600">ID: {id}</Text>
            </div>
          </Space>
        </div>

        {/* Placeholder content */}
        <div className="bg-gray-50 p-4 rounded-md">
          <Text>Settings will be displayed here</Text>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
