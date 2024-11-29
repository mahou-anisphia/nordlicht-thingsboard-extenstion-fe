import React, { useEffect, useState } from "react";
import { Card, Typography, Alert, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useDeviceStore from "@/store/useDeviceStore";
import { StatsCard } from "./components/StatsCard";
import { DeviceFilters } from "./components/DeviceFilter";
import { DeviceTable } from "./components/DeviceTable";
import { getTypeColor, getTypeLabel } from "@/utils/deviceUtils";

const { Title, Text } = Typography;

const DevicesManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    devices,
    counts,
    pagination,
    isLoading,
    error,
    fetchDevices,
    fetchCounts,
  } = useDeviceStore();
  const [filters, setFilters] = useState({
    type: undefined,
    profileId: undefined,
  });

  useEffect(() => {
    fetchCounts();
    fetchDevices(1, 10);
  }, [fetchDevices, fetchCounts]);

  const handlePageChange = (page: number, pageSize: number) => {
    fetchDevices(page, pageSize, filters);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleTypeChange = (value: string) => {
    const newFilters = { ...filters, type: value };
    setFilters(newFilters);
    fetchDevices(1, pagination.pageSize, newFilters);
  };

  const handleSearch = (value: string) => {
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    fetchDevices(1, pagination.pageSize, newFilters);
  };

  const uniqueTypes = counts?.by_type || [];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard value={counts?.total || 0} label="Total Devices" />
          <StatsCard value={uniqueTypes.length || 0} label="Device Types" />
          <StatsCard
            value={counts?.by_profile?.length || 0}
            label="Device Profiles"
          />
        </div>

        <DeviceFilters
          uniqueTypes={uniqueTypes}
          onSearch={handleSearch}
          onTypeChange={handleTypeChange}
          getTypeLabel={getTypeLabel}
        />

        <div className="relative">
          <DeviceTable
            devices={devices}
            isLoading={isLoading}
            pagination={pagination}
            onPageChange={handlePageChange}
            getTypeColor={getTypeColor}
            getTypeLabel={getTypeLabel}
          />
        </div>
      </Card>
    </div>
  );
};

export default DevicesManagementPage;
