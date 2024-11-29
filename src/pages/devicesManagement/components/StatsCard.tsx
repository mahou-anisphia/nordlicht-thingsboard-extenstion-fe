import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

interface StatsCardProps {
  value: number;
  label: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ value, label }) => (
  <Card className="text-center">
    <Title level={3}>{value}</Title>
    <Text>{label}</Text>
  </Card>
);
