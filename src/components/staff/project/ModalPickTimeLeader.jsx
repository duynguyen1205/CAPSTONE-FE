import { CheckCircleFilled, FieldTimeOutlined } from "@ant-design/icons";
import { MdAccessTime } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Steps,
  message,
} from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState } from "react";
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";
const { TextArea } = Input;

const ModalPickTimeLeader = (props) => {
  const [form] = Form.useForm();
  const isModalOpen = props.isModalOpen;
  const today = dayjs().add(1, "day");
  // set up initial value for the form
  const maxDate = dayjs().add(7, "day");
  const steps = [
    {
      title: "Lựa chọn chairman",
      content: <>Hiện danh sách thành viên chọn leader</>,
      icon: <FaUserTie />,
    },
    {
      title: "Chọn thời gian",
      content: (
        <>
          {" "}
          <div>
            <Divider />
            <Form form={form} name="basic">
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    name="key"
                    label="Tên đề tài"
                    labelCol={{ span: 24 }}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    name="date"
                    label="Ngày họp"
                    labelCol={{ span: 24 }}
                  >
                    <DatePicker
                      format={dateFormat}
                      defaultValue={today}
                      minDate={today}
                      maxDate={maxDate}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="details"
                    label="Chi tiết"
                    labelCol={{ span: 24 }}
                  >
                    <TextArea
                      autoSize={{
                        minRows: 3,
                        maxRows: 5,
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </>
      ),
      icon: <MdAccessTime />,
    },
    {
      title: "Xác nhận lại thông tin",
      content: <>Hiện danh sách thành viên, thời gian</>,
      icon: <CheckCircleFilled />,
    },
  ];
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    icon: item.icon,
  }));
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title={steps[current].title}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <div>
            {current > 0 && (
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => prev()}
              >
                Quay lại
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Tiêp tục
              </Button>
            )}

            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Xác nhận
              </Button>
            )}
          </div>,
        ]}
      >
        <Steps current={current} items={items} />
        {steps[current].content}
      </Modal>
    </>
  );
};
export default ModalPickTimeLeader;
