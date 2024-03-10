import React, { useEffect, useRef, useState } from "react";
import { Col, AutoComplete, Modal, Row, Select,Button, Form, Input, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


const { TextArea } = Input;
const ModalAddMember = ({ open, onCancel, data, setAddMember }) => {
  const [form] = Form.useForm();
  const options = data.map((user) => ({
    value: user.email,
    label: user.email, // Hiển thị tên người dùng
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
  console.log(data);
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
    setAddMember(values.item)
    onCancel();
    console.log('Received values of form:', values);
  };

  return (
    <Modal
     width={700}
      title="Thêm nhân viên"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      forceRender
    >
      {" "}
      {/* <Form form={form} layout="vertical" name="userForm">
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
      </Form> */}
       <Form
       form={form}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.List name="item">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{
                display: 'flex',
                marginBottom: 8,
              }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, 'email']}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền email',
                  },
                ]}
                
              >
                
                <Input placeholder="Họ và tên" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'role']}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn role',
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
              <Form.Item
              
                {...restField}
                name={[name, 'taskDescription']}
                rules={[
                  {
                    required: true,
                    message: 'Điền mô tả công việc của thành viên',
                  },
                ]}
              >
                <Input placeholder="Phụ trách công việc" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
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
