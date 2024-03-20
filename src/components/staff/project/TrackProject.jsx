import {
  CheckOutlined,
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Collapse, Spin, Space, Steps } from "antd";
import "./track.scss";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const TrackProjectStaff = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const renderExtra = (step) => {
    if (step === currentStep) {
      return <Spin />;
    } else if (step < currentStep) {
      return <CheckOutlined style={{ color: "green" }} />;
    }
    return null;
  };
  const isCollapseDisabled = (step) => {
    if (step > currentStep) {
      return "disabled";
    } else return "header";
  };

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
      <Space direction="vertical">
        <Collapse
          collapsible={isCollapseDisabled(1)}
          items={[
            {
              key: "1",
              label: "Đăng kí đề tài",
              children: (
                <>
                  <h3>Tên đề tài : ABC</h3>
                  <h5>Ngày tạo : 25/3/2015</h5>
                  <p>Trạng thái : cần tải lại tài liệu</p>
                  <Steps
                    size="small"
                    items={[
                      {
                        title: "Login",
                        status: "finish",
                        icon: <UserOutlined />,
                      },
                      {
                        title: "Verification",
                        status: "finish",
                        icon: <SolutionOutlined />,
                      },
                      {
                        title: "Pay",
                        status: "process",
                        icon: <LoadingOutlined />,
                      },
                      {
                        title: "Done",
                        status: "wait",
                        icon: <SmileOutlined />,
                      },
                      {
                        title: "Login",
                        status: "finish",
                        icon: <UserOutlined />,
                      },
                      {
                        title: "Verification",
                        status: "finish",
                        icon: <SolutionOutlined />,
                      },
                      {
                        title: "Pay",
                        status: "process",
                        icon: <LoadingOutlined />,
                      },
                      {
                        title: "Done",
                        status: "wait",
                        icon: <SmileOutlined />,
                      },
                    ]}
                  />
                </>
              ),
              extra: renderExtra(1),
            },
          ]}
        />
        <Collapse
          collapsible={isCollapseDisabled(2)}
          items={[
            {
              key: "2",
              label: "Báo cáo giữa kì",
              children: <p>{text}</p>,
              extra: renderExtra(2),
            },
          ]}
        />
        <Collapse
          collapsible={isCollapseDisabled(3)}
          items={[
            {
              key: "3",
              label: "Báo cáo cuối kì",
              children: <p>{text}</p>,
              extra: renderExtra(3),
            },
          ]}
        />
        <Collapse
          collapsible={isCollapseDisabled(4)}
          items={[
            {
              key: "4",
              label: "Tổng kết",
              children: <p>{text}</p>,
              extra: renderExtra(4),
            },
          ]}
        />
      </Space>
    </div>
  );
};
export default TrackProjectStaff;
