import React from "react";
import { Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Device } from "@/types/devices";
import type { ColumnsType } from "antd/es/table";

interface ProfileDevicesTableProps {
  devices: Device[];
  loading: boolean;
}

const ProfileDevicesTable: React.FC<ProfileDevicesTableProps> = ({
  devices,
  loading,
}) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    try {
      // First try parsing as ISO string
      return format(parseISO(dateString), "PPpp");
    } catch (error) {
      try {
        // If not ISO, try parsing as timestamp
        const timestamp = parseInt(dateString);
        if (isNaN(timestamp)) throw new Error("Invalid timestamp");
        return format(new Date(timestamp), "PPpp");
      } catch {
        return "Invalid date";
      }
    }
  };

  const getTimestamp = (dateString: string): number => {
    try {
      return parseISO(dateString).getTime();
    } catch {
      try {
        const timestamp = parseInt(dateString);
        if (!isNaN(timestamp)) return timestamp;
      } catch {
        // Return a default timestamp if parsing fails
        return 0;
      }
    }
    return 0;
  };

  const columns: ColumnsType<Device> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Device) => (
        <div
          className="cursor-pointer hover:text-blue-600"
          onClick={() => navigate(`/device/${record.id}`)}
        >
          <Typography.Text strong>{text}</Typography.Text>
          <br />
          <Typography.Text type="secondary" className="text-xs">
            {record.id}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_time",
      key: "created_time",
      render: (text: string) => formatDate(text),
      sorter: (a: Device, b: Device) =>
        getTimestamp(a.created_time) - getTimestamp(b.created_time),
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Customer ID",
      dataIndex: "customer_id",
      key: "customer_id",
      render: (text: string) => (
        <Typography.Text copyable className="text-xs font-mono">
          {text}
        </Typography.Text>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={5} className="mb-4">
        Profile Devices
      </Typography.Title>
      <Table
        dataSource={devices}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} devices`,
        }}
      />
    </div>
  );
};

export default ProfileDevicesTable;
