// DeviceTypeCard.tsx
import { StatCard } from "./StatCard";
import { ApiOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface DeviceTypeCardProps {
  type: string;
  count: number;
  deviceProfileId: string;
}

export const DeviceTypeCard: React.FC<DeviceTypeCardProps> = ({
  type,
  count,
  deviceProfileId,
}) => {
  const navigate = useNavigate();

  return (
    <StatCard
      title={`${type.charAt(0).toUpperCase() + type.slice(1)} Devices`}
      value={count}
      prefix={<ApiOutlined className="text-orange-500" />}
      onClick={() => navigate(`/device-profile/${deviceProfileId}`)}
    />
  );
};
