import React, { useEffect, useRef, useState } from "react";
import {
  Col,
  AutoComplete,
  Modal,
  Row,
  Select,
  Button,
  Form,
  Input,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const ModalAddMember = ({ open, onCancel, data, setAddMember }) => {
  const [form] = Form.useForm();
  const options = data.map((user) => ({
    value: user.accountEmail,
    label: user.accountEmail, // Hiển thị tên người dùng
  }));

  // reset form fields when modal is form, closed
  // const useResetFormOnCloseModal = ({ form, open }) => {
  //   const prevOpenRef = useRef();
  //   useEffect(() => {
  //     prevOpenRef.current = open;
  //   }, [open]);
  //   const prevOpen = prevOpenRef.current;
  //   useEffect(() => {
  //     if (!open && prevOpen) {
  //       form.resetFields();
  //     }
  //   }, [form, prevOpen, open]);
  // };
  //// cách reset field nhanh hơn
  //   useEffect(() =>{
  // if(!open) return ;
  // form.resetFields();
  //   },[open,form]);

  // useResetFormOnCloseModal({
  //   form,
  //   open,
  // });
  const onOk = () => {
    form.submit();
  };

  const onFinish = (values) => {
    setAddMember(values.item);
    onCancel();
  };

  return (
    <Modal
      width={910}
      title="Thêm thành viên"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText={"Xác nhận"}
      cancelText={"Thoát"}
      forceRender
      maskClosable ={false}
    >
      {" "}
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <Form.List name="item">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "email"]}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng điền email",
                      },
                    ]}
                  >
                    <AutoComplete options={options} filterOption={true}>
                      <Input  style={{ width: 210 }} placeholder="Tìm nhà khoa học" />
                    </AutoComplete>
                    {/* <Input placeholder="Email thành viên" /> */}
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "role"]}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn role",
                      },
                    ]}
                  >
                    <Select
                      style={{
                        width: 130,
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
                  <Form.Item
                    {...restField}
                    name={[name, "taskDescription"]}
                    rules={[
                      {
                        required: true,
                        message: "Điền mô tả công việc của thành viên",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: 500 }}
                      placeholder="Phụ trách công việc"
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm thành viên
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};
export default ModalAddMember;
