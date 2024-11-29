// StatCard.tsx - Base component for statistics cards
import React from "react";
import { Card, Spin, Statistic } from "antd";

interface StatCardProps {
  title: string;
  value: number;
  prefix: React.ReactNode;
  suffix?: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  isLoading = false,
  onClick,
}) => {
  return (
    <Card
      className={`transition-all duration-200 ${
        onClick
          ? "hover:shadow-lg cursor-pointer transform hover:-translate-y-1"
          : ""
      }`}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="flex justify-center py-4">
          <Spin />
        </div>
      ) : (
        <Statistic
          title={title}
          value={value}
          prefix={prefix}
          suffix={suffix}
        />
      )}
    </Card>
  );
};
