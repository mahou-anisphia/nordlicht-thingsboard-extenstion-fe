// src/devicemanagement/components/DeviceFilter.tsx
import React, { useState } from "react";
import { Input, Select } from "antd";
import { Device, DeviceProfileCount } from "@/types/devices";

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
  const [selectedProfile, setSelectedProfile] = useState<string>("all");

  const handleSearch = (value: string, profileId?: string) => {
    setSearchTerm(value);
    const currentProfileId = profileId ?? selectedProfile;

    const filteredDevices = allDevices.filter((device) => {
      const matchesSearch =
        device.name.toLowerCase().includes(value.toLowerCase()) ||
        device.id.toLowerCase().includes(value.toLowerCase());

      const matchesProfile =
        currentProfileId === "all"
          ? true
          : device.device_profile.id === currentProfileId;

      return matchesSearch && matchesProfile;
    });

    onSearch(filteredDevices);
  };

  const handleProfileChange = (profileId: string) => {
    setSelectedProfile(profileId);
    handleSearch(searchTerm, profileId);
  };

  return (
    <div className="flex gap-4 mb-6">
      <Input.Search
        placeholder="Search by name or UUID..."
        onChange={(e) => handleSearch(e.target.value)}
        value={searchTerm}
        className="max-w-xl"
        allowClear
      />

      <Select
        placeholder="Filter by profile"
        style={{ width: 200 }}
        value={selectedProfile}
        onChange={handleProfileChange}
      >
        <Select.Option key="all" value="all">
          All profiles
        </Select.Option>
        {profiles.map((profile) => (
          <Select.Option key={profile.profile_id} value={profile.profile_id}>
            {profile.profile_name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
