import React, { useEffect } from "react";
import { Card, Descriptions, Spin, Button, Space, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useProfileStore from "@/store/useProfileStore";
import { AdditionalInfo } from "@/types/profile";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, loading, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading || !profile) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  const additionalInfo = JSON.parse(profile.additionalInfo) as AdditionalInfo;
  const lastLoginDate = dayjs(additionalInfo.lastLoginTs).format(
    "YYYY-MM-DD HH:mm:ss"
  );

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
                Profile Information
              </Title>
              <Text className="text-gray-600">View your profile details</Text>
            </div>
          </div>
        </div>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
          <Descriptions.Item label="First Name">
            {profile.firstName || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {profile.lastName || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Authority">
            {profile.authority}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {profile.phone || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Created Time">
            {dayjs(Number(profile.createdTime)).format("YYYY-MM-DD HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Last Login">
            {lastLoginDate}
          </Descriptions.Item>
          <Descriptions.Item label="Failed Login Attempts">
            {additionalInfo.failedLoginAttempts}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ProfilePage;
