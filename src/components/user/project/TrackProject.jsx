import {
  CheckOutlined,
  FileProtectOutlined,
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Collapse, theme, Spin, Space, Steps, Button, Popover } from "antd";
import "./track.scss";
import { getTopicByUserId, trackReseach } from "../../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const TrackProject = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [dataProcess, setDataProcess] = useState([]);
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
  const location = useLocation();
  let topicId = location.pathname.split("/");
  topicId = topicId[4];
  const getProjectProcess = async () => {
    try {
      const res = await trackReseach({
        topicId: topicId,
      });
      if (res && res.isSuccess) {
        setDataProcess(res.data);
      }
    } catch (error) {
      console.log("====================================");
      console.log("Có lỗi tại theo dõi đề tài: " + error.message);
      console.log("====================================");
    }
  };
  useEffect(() => {
    getProjectProcess();
  }, []);
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
                  <p>Trạng thái: cần tải lại tài liệu</p>
                  <Steps
                    size="small"
                    labelPlacement="vertical"
                    items={[
                      {
                        title: "Nộp đề tài",
                        status: "finish",
                        icon: <FileProtectOutlined />,
                      },
                      {
                        title: "Trưởng khoa duyệt",
                        status: "process",
                        icon: <SolutionOutlined />,
                      },
                      {
                        title: "Staff tạo sơ duyệt",
                        status: "process",
                        icon: <LoadingOutlined />,
                      },
                      {
                        title: "Hội đồng sơ duyệt đánh giá",
                        status: "process",
                        icon: <SmileOutlined />,
                      },
                      {
                        title: "Staff tạo hội đồng đánh giá",
                        status: "process",
                        icon: <UserOutlined />,
                      },
                      {
                        title: "Staff tải lên quyết định",
                        status: "process",
                        icon: <SolutionOutlined />,
                      },
                      {
                        title: "Staff tải hợp đồng lên",
                        status: "process",
                        icon: <LoadingOutlined />,
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
      <Button
        shape="round"
        type="primary"
        danger
        onClick={() => navigate("/user/track")}
        style={{ margin: "10px 0" }}
      >
        Quay về
      </Button>
    </div>
  );
};
export default TrackProject;
