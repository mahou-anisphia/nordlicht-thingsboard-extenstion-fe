import React, { useEffect, useMemo, useRef } from "react";
import { Table, Tag, Card, Typography, Button, Space, Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import useDeviceProfileStore from "@/store/useDeviceProfileStore";
import { DeviceProfile } from "@/types/device-profile.types";
import { ResizableHeader } from "./components/ResizableHeader";
import { useColumnResize } from "@/hooks/useColumnResize";
import {
  transportTypeColors,
  initialColumnWidths,
} from "@/constants/transport-types";

const { Title, Text } = Typography;

const DeviceProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    deviceProfiles,
    loading,
    error,
    pagination,
    fetchDeviceProfiles,
    setPage,
  } = useDeviceProfileStore();

  const { columnWidths, setColumnWidths, handleResize } =
    useColumnResize(containerRef);

  // Adjust initial column widths to fit container
  useEffect(() => {
    const adjustInitialWidths = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const totalWidth = Object.values(initialColumnWidths).reduce(
        (a, b) => a + b,
        0
      );

      if (totalWidth > containerWidth) {
        const ratio = containerWidth / totalWidth;
        const newWidths = Object.entries(initialColumnWidths).reduce(
          (acc, [key, width]) => ({
            ...acc,
            [key]: Math.max(40, Math.floor(width * ratio)),
          }),
          {}
        );

        setColumnWidths(newWidths);
      }
    };

    adjustInitialWidths();
    const resizeObserver = new ResizeObserver(adjustInitialWidths);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [setColumnWidths]);

  useEffect(() => {
    fetchDeviceProfiles();
  }, [fetchDeviceProfiles]);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page, pageSize);
  };

  const currentPageData = useMemo(() => {
    const { page, pageSize } = pagination;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return deviceProfiles.slice(start, end);
  }, [deviceProfiles, pagination]);

  const columns: ColumnsType<DeviceProfile> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: columnWidths.name,
      render: (text: string, record: DeviceProfile) => (
        <Space direction="vertical" size={0}>
          <Text
            strong
            className="cursor-pointer hover:text-blue-600"
            onClick={() => navigate(`/device-profile/${record.id}`)}
          >
            {text}
          </Text>
          {record.is_default && <Tag color="blue">Default</Tag>}
        </Space>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: columnWidths.type,
      render: (text: string) => <Tag color="purple">{text}</Tag>,
    },
    {
      title: "Transport Type",
      dataIndex: "transport_type",
      key: "transport_type",
      width: columnWidths.transport_type,
      render: (text: string) => {
        const normalizedText = text.toUpperCase();
        return (
          <Tag color={transportTypeColors[normalizedText] || "default"}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Provision Type",
      dataIndex: "provision_type",
      key: "provision_type",
      width: columnWidths.provision_type,
      render: (text: string) => <Tag color="orange">{text}</Tag>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: columnWidths.description,
      ellipsis: {
        showTitle: false,
      },
      render: (text: string) => (
        <Tooltip placement="topLeft" title={text}>
          <div className="truncate max-w-full">{text}</div>
        </Tooltip>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_time",
      key: "created_time",
      width: columnWidths.created_time,
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
      sorter: (a, b) =>
        dayjs(a.created_time).unix() - dayjs(b.created_time).unix(),
      defaultSortOrder: "descend",
    },
  ];

  const resizableColumns = columns.map((col) => ({
    ...col,
    onHeaderCell: (column: { width?: number }) => ({
      width: column.width,
      onResize: handleResize(col.key as string),
    }),
  }));

  return (
    <div className="p-6">
      <Card className="shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
              className="hover:bg-gray-50"
            />
            <div>
              <Title level={4} className="mb-1">
                Device Profiles
              </Title>
              <Text className="text-gray-600">
                Manage and configure device profiles
              </Text>
            </div>
          </div>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div
          ref={containerRef}
          className="table-container relative w-full overflow-hidden"
        >
          <Table
            columns={resizableColumns}
            components={{
              header: {
                cell: ResizableHeader,
              },
            }}
            dataSource={currentPageData}
            rowKey="id"
            loading={loading}
            pagination={{
              current: pagination.page,
              pageSize: pagination.pageSize,
              total: deviceProfiles.length,
              onChange: handlePageChange,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} items`,
            }}
            className="shadow-sm"
            style={{ width: "100%" }}
          />
        </div>
      </Card>
    </div>
  );
};

export default DeviceProfilePage;
