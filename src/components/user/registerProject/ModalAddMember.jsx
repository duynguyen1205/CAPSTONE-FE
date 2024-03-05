import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Input, AutoComplete, Modal, Row, Select } from "antd";
const { TextArea } = Input;
const ModalAddMember = ({ open, onCancel, data }) => {
  const options = data.map((user) => ({
    value: user.email,
    label: user.email, // Hiển thị tên người dùng
  }));
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
      title="Thêm nhân viên"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      forceRender
    >
      {" "}
      <Form form={form} layout="vertical" name="userForm">
        <Row gutter={20}>
          <Col span={15}>
            {" "}
            <Form.Item
              name="email"
              label="Họ và tên"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn nhà khoa học",
                },
              ]}
            >
              <AutoComplete options={options} filterOption={true}>
                <Input.Search placeholder="Tìm nhà khoa học" />
              </AutoComplete>
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
              name="taskDescription"
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
