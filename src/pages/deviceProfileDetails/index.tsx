import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Space, message, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import ProfileDetails from "./components/ProfileDetails";
import ProfileDevicesTable from "./components/ProfileDevicesTable";
import { Device } from "@/types/devices";
import useDeviceProfileStore from "@/store/useDeviceProfileStore";
import useDeviceStore from "@/store/useDeviceStore";
import { DeviceProfile } from "@/types/device-profile.types";

const { Title, Text } = Typography;

const DeviceProfileDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    deviceProfiles,
    loading: profileLoading,
    fetchDeviceProfiles,
  } = useDeviceProfileStore();
  const { devices, isLoading: devicesLoading, fetchDevices } = useDeviceStore();
  const [profile, setProfile] = useState<DeviceProfile | null>(null);
  const [profileDevices, setProfileDevices] = useState<Device[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch profile data
        await fetchDeviceProfiles();
        // Fetch all devices with profile filter
        await fetchDevices(1, 100, { profileId: id });
      } catch (error: any) {
        message.error(error?.message || "Failed to fetch data");
      }
    };

    if (id) {
      loadData();
    }
  }, [id, fetchDeviceProfiles, fetchDevices]);

  useEffect(() => {
    // Find the current profile from deviceProfiles
    if (deviceProfiles.length > 0 && id) {
      const currentProfile = deviceProfiles.find((p) => p.id === id);
      if (currentProfile) {
        setProfile(currentProfile);
      }
    }
  }, [deviceProfiles, id]);

  useEffect(() => {
    // Filter devices by profile ID
    if (devices.length > 0 && id) {
      const filteredDevices = devices.filter(
        (device) => device.device_profile.id === id
      );
      setProfileDevices(filteredDevices);
    }
  }, [devices, id]);

  const handleBack = () => {
    navigate(-1);
  };

  const isLoading = profileLoading || devicesLoading;

  return (
    <div className="p-6">
      <Card className="shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
              className="hover:bg-gray-50"
            />
            <div>
              <Title level={4} className="mb-1">
                Device Profile Details
              </Title>
              <Text className="text-gray-600">ID: {id}</Text>
            </div>
          </Space>
        </div>

        {profile && <ProfileDetails profile={profile} />}
        <Divider />
        <ProfileDevicesTable devices={profileDevices} isLoading={isLoading} />
      </Card>
    </div>
  );
};

export default DeviceProfileDetailPage;
