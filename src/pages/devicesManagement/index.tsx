// src/devicemanagement/index.tsx
import React, { useEffect, useState } from "react";
import { Card, Typography, Alert, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useDeviceStore from "@/store/useDeviceStore";
import { StatsSection } from "./components/StatsSection";
import { DeviceTable } from "./components/DeviceTable";
import { DeviceFilters } from "./components/DeviceFilter";
import { Device } from "@/types/devices";

const { Title, Text } = Typography;

const DevicesManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    devices,
    counts,
    pagination,
    loading,
    error,
    fetchDevices,
    fetchCounts,
  } = useDeviceStore();
  const [filteredDevices, setFilteredDevices] = useState<Device[]>(devices);

  useEffect(() => {
    fetchCounts();
    fetchDevices(1, 10);
  }, [fetchDevices, fetchCounts]);

  useEffect(() => {
    setFilteredDevices(devices);
  }, [devices]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = (filtered: Device[]) => {
    setFilteredDevices(filtered);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    fetchDevices(page, pageSize);
  };

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
                Device Management
              </Title>
              <Text className="text-gray-600">
                Manage and monitor all connected devices
              </Text>
            </div>
          </div>
        </div>

        {error && (
          <Alert message={error} type="error" showIcon className="mb-4" />
        )}

        <StatsSection counts={counts} />

        <DeviceFilters
          profiles={counts?.by_profile || []}
          onSearch={handleSearch}
          allDevices={devices}
        />

        <DeviceTable
          devices={filteredDevices}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </Card>
    </div>
  );
};

export default DevicesManagementPage;
