import { CaretRightOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Collapse, theme, Spin } from "antd";
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const TrackProject = () => {
  const [currentStep, setCurrentStep] = useState(1); // Thay đổi giá trị này tùy thuộc vào tiến độ hiện tại
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  const getItems = (panelStyle) => [
    {
      key: "1",
      label: "Đăng kí đề tài",
      children: <p>{text}</p>,
      style: panelStyle,
      disabled: currentStep !== 1,
    },
    {
      key: "2",
      label: "Báo cáo giữa kì",
      children: <p>{text}</p>,
      style: panelStyle,
      disabled: currentStep !== 2,
    },
    {
      key: "3",
      label: "Báo cáo cuối kì",
      children: <p>{text}</p>,
      style: panelStyle,
      disabled: currentStep !== 3,
    },
    {
      key: "4",
      label: "Tổng kết",
      children: <p>{text}</p>,
      style: panelStyle,
      disabled: currentStep !== 4,
    },
  ];
  return (
    <div>
      <h2
        style={{
          fontWeight: "bold",
          fontSize: "30px",
          color: "#303972",
          margin: "20px",
        }}
      >
        Theo dõi tiến độ của đề tài
      </h2>
      <Collapse
        size="large"
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: token.colorBgContainer,
        }}
        items={getItems(panelStyle)}
      />
    </div>
  );
};
export default TrackProject;
