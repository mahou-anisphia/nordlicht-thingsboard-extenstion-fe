// src/devicemanagement/components/DeviceTable.tsx
import React, { useState, useMemo } from "react";
import { Table, Typography, Tag } from "antd";
import { format } from "date-fns";
import { Device } from "@/types/devices";
import { getTypeColor } from "@/utils/deviceUtils";
import type { ResizeCallbackData } from "react-resizable";
import { Resizable } from "react-resizable";
import { useNavigate } from "react-router-dom";
import "react-resizable/css/styles.css";

// Resizable header component
interface ResizableHeaderProps extends React.HTMLAttributes<HTMLElement> {
  width: number;
  onResize: (e: React.SyntheticEvent, data: ResizeCallbackData) => void;
}

const ResizableHeader: React.FC<ResizableHeaderProps> = ({
  width,
  onResize,
  ...restProps
}) => {
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => e.stopPropagation()}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

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
  const navigate = useNavigate();

  // Column widths state
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    name: 200,
    profile: 150,
    created_time: 200,
    customer_id: 300,
  });

  const handleResize =
    (key: string) =>
    (_: React.SyntheticEvent, { size }: ResizeCallbackData) => {
      const containerWidth =
        document.querySelector(".device-table-container")?.clientWidth ?? 1000;

      // Calculate total width of other columns
      const otherColumnsWidth = Object.entries(columnWidths)
        .filter(([k]) => k !== key)
        .reduce((acc, [_, width]) => acc + width, 0);

      // Minimum width just enough to show "..." (around 40px)
      const minWidth = 40;

      // Maximum width is container width minus space for other columns
      // and some padding for scrollbar and borders
      const maxAllowedWidth = containerWidth - otherColumnsWidth - 24;

      // Apply constraints
      const newWidth = Math.max(
        minWidth,
        Math.min(size.width, maxAllowedWidth)
      );

      setColumnWidths((prev) => ({
        ...prev,
        [key]: newWidth,
      }));
    };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: columnWidths.name,
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
      title: "Profile",
      dataIndex: ["device_profile", "name"],
      key: "profile",
      width: columnWidths.profile,
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
      width: columnWidths.created_time,
      render: (text: string) => (
        <span>{format(new Date(parseInt(text)), "PPpp")}</span>
      ),
      sorter: (a: Device, b: Device) =>
        parseInt(a.created_time) - parseInt(b.created_time),
      defaultSortOrder: "descend",
    },
    {
      title: "Customer ID",
      dataIndex: "customer_id",
      key: "customer_id",
      width: columnWidths.customer_id,
      render: (text: string) => (
        <Typography.Text copyable className="text-xs font-mono">
          {text}
        </Typography.Text>
      ),
    },
  ];

  const resizableColumns = columns.map((col) => ({
    ...col,
    onHeaderCell: (column: { width?: number }) => ({
      width: column.width,
      onResize: handleResize(col.key as string),
    }),
  }));

  const tableWidth = useMemo(() => {
    return Object.values(columnWidths).reduce((acc, width) => acc + width, 0);
  }, [columnWidths]);

  return (
    <div className="device-table-container">
      <Table
        dataSource={devices}
        columns={resizableColumns}
        rowKey="id"
        loading={isLoading}
        components={{
          header: {
            cell: ResizableHeader,
          },
        }}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: onPageChange,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} devices`,
        }}
      />
    </div>
  );
};
