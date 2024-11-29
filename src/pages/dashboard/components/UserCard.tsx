// UserCard.tsx
import { UserOutlined } from "@ant-design/icons";
import { StatCard } from "./StatCard";
import { useNavigate } from "react-router-dom";

interface UserCardProps {
  count: number;
  isLoading: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({ count, isLoading }) => {
  const navigate = useNavigate();

  return (
    <StatCard
      title="Users"
      value={count}
      prefix={<UserOutlined className="text-blue-500" />}
      isLoading={isLoading}
      onClick={() => navigate("/users")}
    />
  );
};
