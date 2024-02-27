import React from "react";
import { Col, Form, Input, Row } from "antd";
const { TextArea } = Input;
const RegisterProject = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {};
  return (
    <>
      <h2 style={{ fontWeight: "bold", fontSize: "30px", color: "#303972" }}>
        Đăng kí đề tài
      </h2>
      <Form form={form} name="basic" onFinish={onFinish}>
        <Row gutter={20}>
          <Col span={24}>
            <Form.Item name="key" label="Tên đề tài">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="details" label="Chi tiết">
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
    </>
  );
};
export default RegisterProject;
