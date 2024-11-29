// src/devicemanagement/components/StatsSection.tsx
import React from "react";
import { Row, Col, Card, Statistic, theme } from "antd";
import { DeviceCountResponse } from "@/types/devices";
import { ApiOutlined, AppstoreOutlined } from "@ant-design/icons";

const { useToken } = theme;

interface StatsSectionProps {
  counts: DeviceCountResponse | null;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ counts }) => {
  const { token } = useToken();

  return (
    <Row gutter={[16, 16]} className="mb-6">
      <Col xs={24} md={12}>
        <Card bordered={false} className="hover:shadow-md transition-shadow">
          <Statistic
            title="Total Devices"
            value={counts?.total || 0}
            prefix={
              <ApiOutlined style={{ color: token.blue6 }} className="mr-2" />
            }
            valueStyle={{ color: token.blue6 }}
          />
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card bordered={false} className="hover:shadow-md transition-shadow">
          <Statistic
            title="Device Profiles"
            value={counts?.by_profile?.length || 0}
            prefix={
              <AppstoreOutlined
                style={{ color: token.green6 }}
                className="mr-2"
              />
            }
            valueStyle={{ color: token.green6 }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatsSection;