import React from "react";
import { Table, Tag } from "antd";
import { format } from "date-fns";
import { Device } from "@/types/devices";

interface DeviceTableProps {
  devices: Device[];
  isLoading: boolean;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
  onPageChange: (page: number, pageSize: number) => void;
  getTypeColor: (type: string) => string;
  getTypeLabel: (type: string) => string;
}

export const DeviceTable: React.FC<DeviceTableProps> = ({
  devices,
  isLoading,
  pagination,
  onPageChange,
  getTypeColor,
  getTypeLabel,
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={getTypeColor(type)}>{getTypeLabel(type)}</Tag>
      ),
    },
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      render: (text: string | null) => text || "-",
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
        <span className="text-xs font-mono">{text}</span>
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
