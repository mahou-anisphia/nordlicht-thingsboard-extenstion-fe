import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import { LoginCredentials } from "@/types/auth";

import logoPath from "@/assets/logo.jpg";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated } = useAuthStore();
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values: LoginCredentials) => {
    await login(values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-xl shadow-md p-6">
        <div className="flex justify-center mb-6">
          <img src={logoPath} alt="Platform Logo" className="max-h-20 mb-4" />
        </div>

        {/* Large text about platform name */}
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Nordlicht Data Exporter
        </h1>

        {/* Smaller text about signing in */}
        <p className="text-center text-gray-600 mb-6">
          Sign in to continue to your dashboard
        </p>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
          initialValues={{ email: "tenant@thingsboard.org" }}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={isLoading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
