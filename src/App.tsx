import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import useAuthStore from "./store/useAuthStore";
import themeConfig from "./theme/themeConfig";
import AppRoutes from "./router/AppRoutes";

const App: React.FC = () => {
  const rehydrate = useAuthStore((state) => state.rehydrate);

  useEffect(() => {
    rehydrate(); // Rehydrate authentication state from localStorage
  }, [rehydrate]);

  return (
    <ConfigProvider theme={themeConfig}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
