import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import { LoginCredentials } from "@/types/auth";
import logoPath from "@/assets/logo.jpg";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated, setUiPreference } = useAuthStore();
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values: LoginCredentials) => {
    await login(values);
  };

  const handleSwitchToOldUi = () => {
    setUiPreference("new");
    navigate("/signin");
  };

  return (
    <div
      className="flex rounded-lg overflow-hidden bg-white shadow-xl"
      style={{ width: "800px", height: "500px" }}
    >
      {/* Left side - Image */}
      <div className="w-[55%]">
        <img
          src="/vt-sidebanner.png"
          alt="Service Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-[45%] p-6 flex flex-col">
        <div className="mb-6">
          {/* Logo centered */}
          <div className="flex justify-center">
            <img
              src={logoPath}
              alt="Viettel Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          {/* Header text above logo */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Nordlichrt Data Exporter
            </h1>
          </div>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
          className="flex-1 flex flex-col"
        >
          <div className="space-y-4">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Email"
                size="large"
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Password"
                size="large"
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item className="mb-3">
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={isLoading}
                className="bg-red-600 hover:bg-red-700"
              >
                Sign In
              </Button>
            </Form.Item>
          </div>

          <div className="mt-auto text-center">
            <p className="text-gray-600 text-xs leading-relaxed">
              <span className="font-semibold block mb-1">
                Nordlicht Data Exporter
              </span>
              Empowering data management by Viettel Innovation Lab
            </p>
            <span
              onClick={handleSwitchToOldUi}
              className="text-gray-400 hover:text-gray-600 text-sm mt-4 cursor-pointer inline-block"
            >
              Want to try something new? Switch to the modern UI
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
