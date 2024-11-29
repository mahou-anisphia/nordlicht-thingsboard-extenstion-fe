import React, { useEffect } from "react";
import { Card, Row, Col, Statistic, Spin } from "antd";
import { UserOutlined, ApiOutlined, AppstoreOutlined } from "@ant-design/icons";
import useUserStore from "@/store/useUserStore";
import useDeviceStore from "@/store/useDeviceStore";
import useDeviceProfileStore from "@/store/useDeviceProfileStore";

const Dashboard: React.FC = () => {
  // Get store data and functions
  const {
    count: userCount,
    isLoading: usersLoading,
    fetchCount: fetchUserCount,
  } = useUserStore();
  const {
    counts: deviceCounts,
    isLoading: devicesLoading,
    fetchCounts: fetchDeviceCounts,
  } = useDeviceStore();
  const {
    counts: profileCounts,
    isLoading: profilesLoading,
    fetchCounts: fetchProfileCounts,
  } = useDeviceProfileStore();

  // Fetch data on component mount
  useEffect(() => {
    fetchUserCount();
    fetchDeviceCounts();
    fetchProfileCounts();
  }, []);

  const isLoading = usersLoading || devicesLoading || profilesLoading;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Spin />
              </div>
            ) : (
              <Statistic
                title="Users"
                value={userCount}
                prefix={<UserOutlined className="text-blue-500" />}
              />
            )}
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Spin />
              </div>
            ) : (
              <Statistic
                title="Devices"
                value={deviceCounts?.total || 0}
                prefix={<ApiOutlined className="text-green-500" />}
                suffix={
                  <span className="text-xs text-gray-500">
                    ({deviceCounts?.by_type.length || 0} types)
                  </span>
                }
              />
            )}
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Spin />
              </div>
            ) : (
              <Statistic
                title="Device Profiles"
                value={profileCounts?.total_profiles || 0}
                prefix={<AppstoreOutlined className="text-purple-500" />}
                suffix={
                  <span className="text-xs text-gray-500">
                    ({profileCounts?.total_devices || 0} devices)
                  </span>
                }
              />
            )}
          </Card>
        </Col>
      </Row>

      {/* Additional device type breakdown */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Device Types</h2>
      <Row gutter={[16, 16]}>
        {deviceCounts?.by_type.map((typeData) => (
          <Col xs={24} sm={8} key={typeData.type}>
            <Card>
              <Statistic
                title={`${
                  typeData.type.charAt(0).toUpperCase() + typeData.type.slice(1)
                } Devices`}
                value={typeData.count}
                prefix={<ApiOutlined className="text-orange-500" />}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
