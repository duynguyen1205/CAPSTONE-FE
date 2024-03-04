import React, { useEffect, useRef } from "react";
import { Col, Form, Input, InputNumber, Modal, Row, Select } from "antd";
const { TextArea } = Input;
const ModalAddMember = ({ open, onCancel }) => {
  // reset form fields when modal is form, closed
  const useResetFormOnCloseModal = ({ form, open }) => {
    const prevOpenRef = useRef();
    useEffect(() => {
      prevOpenRef.current = open;
    }, [open]);
    const prevOpen = prevOpenRef.current;
    useEffect(() => {
      if (!open && prevOpen) {
        form.resetFields();
      }
    }, [form, prevOpen, open]);
  };

  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    open,
  });
  const onOk = () => {
    form.submit();
  };
  return (
    <Modal
      title="Thêm nhân viên vào đề tài"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
    >
      {" "}
      <Form form={form} layout="vertical" name="userForm">
        <Row gutter={20}>
          <Col span={15}>
            {" "}
            <Form.Item
              name="name"
              label="User Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={9}>
            {" "}
            <Form.Item
              name="role"
              label="Vai trò"
              rules={[
                {
                  required: true,
                  message: "Xin hãy chọn vai trò",
                },
              ]}
            >
              <Select
                style={{
                  width: 150,
                }}
                options={[
                  {
                    value: "1",
                    label: "Thành viên",
                  },
                  {
                    value: "0",
                    label: "Thư kí",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            {" "}
            <Form.Item
              name="note"
              label="Phụ trách công việc"
              rules={[
                {
                  required: true,
                  message: "Xin hãy ghi công việc phụ trách",
                },
              ]}
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
  );
};
export default ModalAddMember;
