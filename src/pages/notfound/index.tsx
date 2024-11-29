import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import image from "./assets/notFound.jpg";
import { Button } from "antd";

const NotFoundPage = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="text-center">
        <img src={image} alt="Not Found" className="mx-auto mb-4 w-96 h-auto" />{" "}
        <h1 className="text-4xl font-bold mb-2">
          Sorry, we couldn't find the page you're looking for.
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          It seems that the page you are trying to access does not exist.
        </p>
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          size="large"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
