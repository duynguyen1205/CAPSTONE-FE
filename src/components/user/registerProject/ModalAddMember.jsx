import React from "react";
import {
  AutoComplete,
  Modal,
  Select,
  Button,
  Form,
  Input,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const ModalAddMember = ({ open, onCancel, data, setAddMember }) => {
  const [form] = Form.useForm();
  const options = data.map((user) => ({
    value: user.accountEmail,
    label: user.accountEmail, // Hiển thị tên người dùng
  }));

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
      maskClosable={false}
    >
      {" "}
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <Form.List
          name="item"
          initialValue={[
            { email: "", role: "", taskDescription: "" },
          ]}
        >
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
                      <Input
                        style={{ width: 210 }}
                        placeholder="Tìm nhà khoa học"
                      />
                    </AutoComplete>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "role"]}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn vai trò",
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
                      placeholder="Vai trò"

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
                disabled ={fields.length >= 10}
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm thành viên
                </Button>
                {fields.length >=10 ? "Tối đa 10 thành viên" : ""}
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};
export default ModalAddMember;
