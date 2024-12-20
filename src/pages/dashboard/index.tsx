import React, { useEffect } from "react";
import { Row, Col } from "antd";
import useUserStore from "@/store/useUserStore";
import useDeviceStore from "@/store/useDeviceStore";
import useDeviceProfileStore from "@/store/useDeviceProfileStore";
import {
  UserCard,
  DeviceCard,
  DeviceProfileCard,
  DeviceTypeCard,
} from "./components";

const Dashboard: React.FC = () => {
  // Get store data and functions
  const {
    counts: userCounts,
    loading: usersLoading,
    fetchCounts: fetchUserCounts,
  } = useUserStore();

  const {
    counts: deviceCounts,
    loading: devicesLoading,
    fetchCounts: fetchDeviceCounts,
  } = useDeviceStore();

  const {
    counts: profileCounts,
    loading: profilesLoading,
    fetchCounts: fetchProfileCounts,
  } = useDeviceProfileStore();

  // Fetch data on component mount
  useEffect(() => {
    fetchUserCounts();
    fetchDeviceCounts();
    fetchProfileCounts();
  }, []);

  const isLoading = usersLoading || devicesLoading || profilesLoading;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <UserCard count={userCounts} isLoading={isLoading} />
        </Col>

        <Col xs={24} sm={8}>
          <DeviceCard
            totalDevices={deviceCounts?.total || 0}
            typeCount={deviceCounts?.by_type.length || 0}
            isLoading={isLoading}
          />
        </Col>

        <Col xs={24} sm={8}>
          <DeviceProfileCard
            totalProfiles={profileCounts?.total_profiles || 0}
            totalDevices={profileCounts?.total_devices || 0}
            isLoading={isLoading}
          />
        </Col>
      </Row>

      {/* Device type breakdown */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Device Types</h2>
      <Row gutter={[16, 16]}>
        {deviceCounts?.by_profile.map((typeData) => (
          <Col xs={24} sm={8} key={typeData.profile_name}>
            <DeviceTypeCard
              type={typeData.profile_name}
              count={typeData.count}
              deviceProfileId={typeData.profile_id}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
