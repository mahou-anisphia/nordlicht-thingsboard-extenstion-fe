// src/devicemanagement/components/DeviceTable.tsx
import React from "react";
import { Table, Typography, Tag } from "antd";
import { format } from "date-fns";
import { Device } from "@/types/devices";
import { getTypeColor } from "@/utils/deviceUtils";

interface DeviceTableProps {
  devices: Device[];
  isLoading: boolean;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
  onPageChange: (page: number, pageSize: number) => void;
}

export const DeviceTable: React.FC<DeviceTableProps> = ({
  devices,
  isLoading,
  pagination,
  onPageChange,
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Device) => (
        <div>
          <Typography.Text strong>{text}</Typography.Text>
          <br />
          <Typography.Text type="secondary" className="text-xs">
            {record.id}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: "Profile",
      dataIndex: ["device_profile", "name"],
      key: "profile",
      render: (text: string) => {
        const { color, background } = getTypeColor(text);
        return (
          <Tag color={background} className="border-0">
            <span style={{ color }}>{text}</span>
          </Tag>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "created_time",
      key: "created_time",
      render: (text: string) => (
        <span>{format(new Date(parseInt(text)), "PPpp")}</span>
      ),
    },
    {
      title: "Customer ID",
      dataIndex: "customer_id",
      key: "customer_id",
      width: 300,
      render: (text: string) => (
        <Typography.Text copyable className="text-xs font-mono">
          {text}
        </Typography.Text>
      ),
    },
  ];

  return (
    <Table
      dataSource={devices}
      columns={columns}
      rowKey="id"
      loading={isLoading}
      pagination={{
        current: pagination.page,
        pageSize: pagination.pageSize,
        total: pagination.total,
        onChange: onPageChange,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} devices`,
      }}
    />
  );
};
