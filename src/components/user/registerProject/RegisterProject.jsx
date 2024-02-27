import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
  Space,
  Avatar,
  message,
  Upload,
  ConfigProvider,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  CloseOutlined,
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ModalAddMember from "./ModalAddMember";
dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";
const { TextArea } = Input;
//
const { Dragger } = Upload;

const RegisterProject = () => {
  const [open, setOpen] = useState(false);
  const [listUser, setListUser] = useState([]);
  const showUserModal = () => {
    setOpen(true);
  };
  const hideUserModal = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    console.log("check values:", values);
  };
  const selectAfter = (
    <Select
      defaultValue={"VND"}
      style={{
        width: 100,
      }}
    >
      <Option value="VND">VND</Option>
      <Option value="USD">$</Option>
    </Select>
  );
  const [form] = Form.useForm();
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };
  //props của upload
  const props = {
    name: "file",
    multiple: true,
    customRequest: dummyRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <>
      <h2
        style={{
          fontWeight: "bold",
          fontSize: "30px",
          color: "#303972",
          marginBottom: "40px",
        }}
      >
        Đăng kí đề tài
      </h2>
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          if (name === "userForm") {
            const { basicForm } = forms;
            const users = basicForm.getFieldValue("users") || [];
            basicForm.setFieldsValue({
              users: [...users, values],
            });
            setOpen(false);
          }
        }}
      >
        <Form form={form} name="basicForm" onFinish={onFinish}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                name="key"
                label="Tên đề tài"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập tên đề tài",
                  },
                ]}
                labelCol={{
                  span: 2,
                }}
                wrapperCol={{ sm: { offset: 3 } }}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="details"
                label="Chi tiết"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập tóm tắt nội dung đề tài",
                  },
                ]}
                labelCol={{
                  span: 2,
                }}
                wrapperCol={{ sm: { offset: 3 } }}
              >
                <TextArea
                  autoSize={{
                    minRows: 4,
                    maxRows: 22,
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="money"
                label="Kinh Phí Dự Kiến"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập kinh phí dựa kiến",
                  },
                ]}
                wrapperCol={{ sm: { offset: 4 } }}
              >
                <InputNumber addonAfter={selectAfter} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="field"
                label="Lĩnh vực nghiên cứu"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy chọn lĩnh vực nghiên cứu",
                  },
                ]}
                labelCol={{
                  span: 7,
                }}
                wrapperCol={{ sm: { offset: 1 } }}
                style={{ marginLeft: "20px" }}
              >
                <Select
                  style={{
                    width: 150,
                  }}
                  options={[
                    {
                      value: "scien",
                      label: "sinh lý",
                    },
                    {
                      value: "lucy",
                      label: "phụ sản",
                    },
                    {
                      value: "tom",
                      label: "tâm lý học",
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
              required={true}
                name="group"
                label="Thêm thành viên thực hiện"
              >
                <Button
                  htmlType="button"
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={showUserModal}
                >
                  Thêm thành viên
                </Button>
              </Form.Item>
              {/* Create a hidden field to make Form instance record this */}
              <Form.Item name="users" hidden />
              <Form.Item
                label="Thành viên đề tài"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy thêm thành viên nghiên cứu",
                  },
                ]}
                shouldUpdate={(prevValues, curValues) =>
                  prevValues.users !== curValues.users
                }
              >
                {({ getFieldValue, setFieldsValue }) => {
                  const users = getFieldValue("users") || [];
                  return users.length ? (
                    <ul>
                      {users.map((user, index) => (
                        <li key={user.index} className="user">
                          <Space>
                            <Avatar icon={<UserOutlined />} />
                            {`${user.name} - ${user.role}`}
                            <CloseOutlined
                              onClick={() => {
                                delete users[index];
                                const updatedUsers = users.filter((u) => !!u);
                                console.log(
                                  "updatedUsers: ",
                                  index,
                                  updatedUsers,
                                  users[index],
                                  user?.name
                                );
                                setFieldsValue({ users: updatedUsers });
                              }}
                              style={{ paddingLeft: 15 }}
                            />
                          </Space>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography.Text className="ant-form-text" type="secondary">
                      ( <SmileOutlined /> Chưa có thành viên. )
                    </Typography.Text>
                  );
                }}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tine"
                label="Thời gian bắt đầu dự kiến "
                rules={[
                  {
                    required: true,
                    message: "Xin hãy chọn thời gian bắt đầu dự kiến ",
                  },
                ]}
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{ sm: { offset: 1 } }}
              >
                <DatePicker
                  defaultValue={dayjs("2024-09-03", dateFormat)}
                  minDate={dayjs("2024-08-27", dateFormat)}
                  maxDate={dayjs("2030-10-31", dateFormat)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.List name="user">
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
                          name={[name, "fullName"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập tên thành viên đào tạo",
                            },
                          ]}
                        >
                          <Input placeholder="Tên thành viên đào tạo" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "role1"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chon vai trò",
                            },
                          ]}
                        >
                          <Select
                            style={{
                              width: 150,
                            }}
                            options={[
                              {
                                value: "thacsi",
                                label: "Thạc sĩ",
                              },
                              {
                                value: "tiensi",
                                label: "Tiến sĩ",
                              },
                              {
                                value: "CK1",
                                label: "CK1",
                              },
                            ]}
                          />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item
                      name="group1"
                      label="Thêm thành viên đào tạo (nếu có)"
                    >
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Thêm
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
            <Col span={24}></Col>
            <Col span={7}>
              <h3>Đính kèm tài liệu liên quan</h3>
              <Form.Item
                labelCol={{
                  span: 12,
                }}
              >
                <Dragger {...props} style={{ width: 300, height: 300 }}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited
                    from uploading company data or other banned files.
                  </p>
                </Dragger>
              </Form.Item>
            </Col>
            <Col span={24}></Col>
            <Form.Item>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#41C221",
                  },
                }}
              >
                <Button style={{marginLeft: "500px"}} type="primary" htmlType="submit">Xác nhận</Button>
              </ConfigProvider>
              ,
            </Form.Item>
          </Row>
        </Form>
        {/* modal thêm người dùng */}
        <ModalAddMember open={open} onCancel={hideUserModal} />
      </Form.Provider>
    </>
  );
};
export default RegisterProject;
