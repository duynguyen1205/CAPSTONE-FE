import React, { useEffect, useState } from "react";
import { Button, Col, ConfigProvider, Form, Input, Modal, Row } from "antd";
const { TextArea } = Input;
const ModalReject = (props) => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const data = props.data;
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.setIsModalRejOpen(false);
    form.resetFields();
  };

  const onSubmit = async (values) => {
    console.log("check values: ", values);
  };
  const isModalOpen = props.isModalRejOpen;
  // set up initial value for the form
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  return (
    <>
      <Modal
        title="Lý do từ chối"
        onCancel={handleCancel}
        open={isModalOpen}
        confirmLoading={isSubmit}
        maskClosable={false}
        forceRender
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
            <Button type="primary" onClick={handleOk}>
              Gửi
            </Button>
          </ConfigProvider>,
        ]}
      >
        <Form form={form} name="basic" onFinish={onSubmit}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item name="key" label="ID đề tài" labelCol={{ span: 24 }}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="name" label="Tên đề tài" labelCol={{ span: 24 }}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="comment"
                label="Lý do từ chối thực hiện"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Xin hãy cho biết lý do từ chối!" }]}
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
export default ModalReject;
