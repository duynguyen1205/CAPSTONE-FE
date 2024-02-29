import { Button, Col, ConfigProvider, Divider, Form, Input, Modal, Row } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";
const { TextArea } = Input;
const ModalPickTime = (props) => {
  const isModalOpen = props.isModalOpen;
  const [form] = Form.useForm();

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  // set up initial value for the form
  return (
    <>
      <Modal
        title="Tạo hội đồng"
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Thoát
          </Button>,
          <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#41C221",
            },
          }}
        >
          <Button type="primary">
            Gửi
          </Button>
        </ConfigProvider>,
        ]}
      >
        <Divider />
        <Form form={form} name="basic">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name="key" label="Tên đề tài" labelCol={{ span: 24 }}>
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="date"
                label="Ngày họp"
                labelCol={{ span: 24 }}
              >
                <DatePicker
                  defaultValue={dayjs("2024-09-03", dateFormat)}
                  minDate={dayjs("2024-08-27", dateFormat)}
                  maxDate={dayjs("2030-10-31", dateFormat)}
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
      </Modal>
    </>
  );
};
export default ModalPickTime;
