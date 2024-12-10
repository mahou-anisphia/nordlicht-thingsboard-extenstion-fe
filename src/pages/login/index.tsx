// src/pages/login/index.tsx
import React from "react";
import LoginForm from "./components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/vt-banner.jpg")' }}
    >
      <div className="min-h-screen bg-black/50 flex justify-center items-center p-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
