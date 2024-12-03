import React, { useEffect } from "react";
import { Table, Card, Typography, Alert, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import { User } from "@/types/users";

const { Title, Text } = Typography;

const UsersPage = () => {
  const navigate = useNavigate();
  const { users, pagination, loading, error, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers(1, 10);
  }, [fetchUsers]);

  const handlePageChange = (page: number, pageSize: number) => {
    fetchUsers(page, pageSize);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Name",
      key: "name",
      render: (_: any, record: User) => (
        <span>
          {record.firstName || record.lastName
            ? `${record.firstName || ""} ${record.lastName || ""}`
            : "-"}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text: string | null) => text || "-",
    },
    {
      title: "Created At",
      dataIndex: "createdTime",
      key: "createdTime",
      render: (text: string) => (
        <span>{format(new Date(parseInt(text)), "PPpp")}</span>
      ),
    },
    {
      title: "Last Login",
      key: "lastLogin",
      render: (_: any, record: User) => {
        if (!record.additionalInfo) return "-";
        try {
          const info = JSON.parse(record.additionalInfo);
          return info.lastLoginTs
            ? format(new Date(info.lastLoginTs), "PPpp")
            : "-";
        } catch {
          return "-";
        }
      },
    },
  ];

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
                User Management
              </Title>
              <Text className="text-gray-600">
                Manage and view all system users
              </Text>
            </div>
          </div>
        </div>

        {error && (
          <Alert message={error} type="error" showIcon className="mb-4" />
        )}

        <div className="relative">
          <Table
            dataSource={users}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: pagination.total,
              onChange: handlePageChange,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} users`,
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default UsersPage;
