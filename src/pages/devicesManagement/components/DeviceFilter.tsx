// src/devicemanagement/components/DeviceFilters.tsx
import React, { useState } from "react";
import { Input, Card, Row, Col } from "antd";
import { Device, DeviceProfileCount } from "@/types/devices";
import { getTypeColor } from "@/utils/deviceUtils";

interface DeviceFiltersProps {
  profiles: DeviceProfileCount[];
  onSearch: (devices: Device[]) => void;
  allDevices: Device[];
}

export const DeviceFilters: React.FC<DeviceFiltersProps> = ({
  profiles,
  onSearch,
  allDevices,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filteredDevices = allDevices.filter(
      (device) =>
        device.name.toLowerCase().includes(value.toLowerCase()) ||
        device.id.toLowerCase().includes(value.toLowerCase())
    );
    onSearch(filteredDevices);
  };

  return (
    <div className="space-y-6">
      <Row gutter={[16, 16]} className="mb-6">
        {profiles.map((profile) => (
          <Col xs={24} sm={12} md={8} lg={6} key={profile.profile_id}>
            <Card
              className="text-center hover:shadow-md transition-shadow"
              style={{
                backgroundColor: getTypeColor(profile.profile_name),
                color: "white",
              }}
            >
              <div className="text-2xl font-bold mb-2">{profile.count}</div>
              <div>{profile.profile_name}</div>
            </Card>
          </Col>
        ))}
      </Row>

      <Input.Search
        placeholder="Search by name or UUID..."
        onChange={(e) => handleSearch(e.target.value)}
        value={searchTerm}
        className="max-w-xl"
        allowClear
      />
    </div>
  );
};
