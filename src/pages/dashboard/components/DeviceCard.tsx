// DeviceCard.tsx
import { ApiOutlined } from "@ant-design/icons";
import { StatCard } from "./StatCard";
import { useNavigate } from "react-router-dom";

interface DeviceCardProps {
  totalDevices: number;
  typeCount: number;
  isLoading: boolean;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
  totalDevices,
  typeCount,
  isLoading,
}) => {
  const navigate = useNavigate();

  return (
    <StatCard
      title="Devices"
      value={totalDevices}
      prefix={<ApiOutlined className="text-green-500" />}
      suffix={
        <span className="text-xs text-gray-500">({typeCount} types)</span>
      }
      isLoading={isLoading}
      onClick={() => navigate("/devices")}
    />
  );
};
