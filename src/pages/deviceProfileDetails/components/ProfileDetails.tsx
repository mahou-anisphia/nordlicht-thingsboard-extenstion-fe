import React from "react";
import { Descriptions } from "antd";
import { format, parseISO } from "date-fns";

interface ProfileDetailsProps {
  profile: {
    name: string;
    description?: string;
    type?: string;
    created_time: string;
    id: string;
  };
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile }) => {
  const formatDate = (dateString: string) => {
    try {
      // First try parsing as ISO string
      return format(parseISO(dateString), "PPpp");
    } catch (error) {
      try {
        // If not ISO, try parsing as timestamp
        const timestamp = parseInt(dateString);
        if (isNaN(timestamp)) throw new Error("Invalid timestamp");
        return format(new Date(timestamp), "PPpp");
      } catch {
        return "Invalid date";
      }
    }
  };

  return (
    <Descriptions title="Profile Information" bordered>
      <Descriptions.Item label="Name" span={3}>
        {profile.name}
      </Descriptions.Item>
      {profile.description && (
        <Descriptions.Item label="Description" span={3}>
          {profile.description}
        </Descriptions.Item>
      )}
      <Descriptions.Item label="Type" span={2}>
        {profile.type}
      </Descriptions.Item>
      <Descriptions.Item label="Created Time">
        {formatDate(profile.created_time)}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ProfileDetails;
