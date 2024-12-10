// src/pages/login/index.tsx
import React from "react";
import LoginForm from "./components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
