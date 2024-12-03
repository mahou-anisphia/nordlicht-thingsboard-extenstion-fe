// DeviceProfileCard.tsx
import { AppstoreOutlined } from "@ant-design/icons";
import { StatCard } from "./StatCard";
import { useNavigate } from "react-router-dom";

interface DeviceProfileCardProps {
  totalProfiles: number;
  totalDevices: number;
  loading: boolean;
}

export const DeviceProfileCard: React.FC<DeviceProfileCardProps> = ({
  totalProfiles,
  totalDevices,
  loading,
}) => {
  const navigate = useNavigate();

  return (
    <StatCard
      title="Device Profiles"
      value={totalProfiles}
      prefix={<AppstoreOutlined className="text-purple-500" />}
      suffix={
        <span className="text-xs text-gray-500">({totalDevices} devices)</span>
      }
      loading={loading}
      onClick={() => navigate("/device-profiles")}
    />
  );
};
