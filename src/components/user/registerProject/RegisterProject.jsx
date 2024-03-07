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
  UserOutlined,
} from "@ant-design/icons";
import ModalAddMember from "./ModalAddMember";
import {
  createTopicAPI,
  getAllCategory,
  getAllUser,
  uploadFile,
} from "../../../services/api";
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";
const { TextArea } = Input;
//
const { Dragger } = Upload;
const today = dayjs().add(1, "day");
const RegisterProject = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [newTopicFiles, setFileList] = useState([]);
  const showUserModal = () => {
    setOpen(true);
  };
  const hideUserModal = () => {
    setOpen(false);
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
  //props của upload
  const props = {
    name: "file",
    multiple: true,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        // Thực hiện tải lên file thông qua API của bạn
        const response = await uploadFile(file);
        setFileList((fileList) => [
          ...fileList,
          {
            topicFileName: response.data[0].fileName,
            topicFileLink: response.data[0].fileLink,
          },
        ]);
        // Gọi onSuccess để xác nhận rằng tải lên đã thành công
        onSuccess(response, file);
        // Hiển thị thông báo thành công
        message.success(`${file.name} file uploaded successfully.`);
      } catch (error) {
        // Gọi onError để thông báo lỗi nếu có vấn đề khi tải lên
        onError(error);

        // Hiển thị thông báo lỗi
        message.error(`${file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const getCategory = async () => {
    const res = await getAllCategory();
    if (res && res?.data) {
      setCategory(res.data);
    }
  };
  const getUser = async () => {
    const res = await getAllUser();
    if (res && res?.data) {
      setListUser(res?.data);
    }
  };
  useEffect(() => {
    getUser();
    getCategory();
  }, []);
  const onFinish = async (values) => {
    // chuyển trường email thành trường id
    const user = values.memberList;
    const emailToIdMap = {};
    listUser.forEach((item) => {
      emailToIdMap[item.email] = item.id;
    });
    const newData = user.map((item) => {
      const userId = emailToIdMap[item.email];
      const newItem = { userId, ...item };
      delete newItem.email;
      newItem.role = Number(newItem.role);
      return newItem;
    });
    const creatorId = "9645623f-dec0-4741-be28-0baeb1590c8c";
    const {categoryId, topicName, description, budget } = values
    const data = {
      categoryId : categoryId,
        creatorId: creatorId,
        topicName: values.topicName,
        description: values.description,
        budget: values.budget.toString(),
        memberList: newData,
        newTopicFiles: newTopicFiles,
    }
    try {
      const res = await createTopicAPI(data);
      if(res) {
        message.success("Tạo topic thành công")
        setFileList([])
        form.resetFields();
        console.log("check kết quả trả về", res.message);
      }
    } catch (error) {
      console.error("lỗi thêm mới topic", error);
    }
    console.log("check values:", newData);
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
            const memberList = basicForm.getFieldValue("memberList") || [];
            basicForm.setFieldsValue({
              memberList: [...memberList, values],
            });
            setOpen(false);
          }
        }}
      >
        <Form form={form} name="basicForm" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="topicName"
                label="Tên đề tài"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập tên đề tài",
                  },
                ]}
                labelCol={{span:24}}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Chi tiết"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập tóm tắt nội dung đề tài",
                  },
                ]}
                labelCol={{span:24}}
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
                name="budget"
                label="Kinh Phí Dự Kiến"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập kinh phí dự kiến",
                  },
                ]}
                labelCol={{span:24}}
              >
                <InputNumber addonAfter={selectAfter} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="categoryId"
                label="Lĩnh vực nghiên cứu"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy chọn lĩnh vực nghiên cứu",
                  },
                ]}
                labelCol={{span:24}}
              >
                <Select
                  style={{ width: 150 }}
                  options={category.map((item) => ({
                    value: item.categoryId,
                    label: item.categoryName,
                  }))}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                required={true}
                name="group"
                label="Thành viên thực hiện"
              >
                <Button htmlType="button" onClick={showUserModal}>
                  Thêm thành viên
                </Button>
              </Form.Item>
              {/* Create a hidden field to make Form instance record this */}
              <Form.Item name="memberList" hidden />

              <Form.Item
                label="Thành viên"
                rules={[
                  {
                    required: true,
                  },
                ]}
                shouldUpdate={(prevValues, curValues) =>
                  prevValues.memberList !== curValues.memberList
                }
              >
                {({ getFieldValue, setFieldsValue }) => {
                  const memberList = getFieldValue("memberList") || [];
                  return memberList.length ? (
                    <ul>
                      {memberList.map((user, index) => (
                        <li key={user.index} className="user">
                          <Space>
                            <Avatar icon={<UserOutlined />} />
                            {`${user.email} - ${
                              user.role === 1 ? "Thành viên" : "Thư kí"
                            } - ${user.taskDescription}`}
                            <CloseOutlined
                              onClick={() => {
                                delete memberList[index];
                                const updatedUsers = memberList.filter(
                                  (u) => !!u
                                );
                                setFieldsValue({ memberList: updatedUsers });
                              }}
                              style={{ paddingLeft: 15 }}
                            />
                          </Space>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography.Text className="ant-form-text" type="secondary">
                      ( Chưa có thành viên. )
                    </Typography.Text>
                  );
                }}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tine"
                label="Thời gian bắt đầu dự kiến: "
                rules={[
                  {
                    required: true,
                    message: "Xin hãy chọn thời gian bắt đầu dự kiến ",
                  },
                ]}
              >
                <DatePicker
                  format={dateFormat}
                  defaultValue={today}
                  minDate={today}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
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
                      label="Thành viên đào tạo (nếu có):"
                    >
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        style={{ maxWidth: "200px" }}
                      >
                        Thêm
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
            <Col span={24}>
              <h3>Đính kèm tài liệu liên quan</h3>
              <Form.Item
                labelCol={{
                  span: 12,
                }}
              >
                <Upload.Dragger {...props} style={{ width: 300, height: 300 }}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Nhấp hoặc kéo tệp vào khu vực này để tải lên
                  </p>
                  <p className="ant-upload-hint">
                    Hỗ trợ tải lên một lần hoặc hàng loạt. Vui lòng để tên file
                    là tiếng việt không dấu
                  </p>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#41C221",
                    },
                  }}
                >
                  <Button
                    style={{ marginLeft: "500px" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Xác nhận
                  </Button>
                </ConfigProvider>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        {/* modal thêm người dùng */}
        <ModalAddMember open={open} onCancel={hideUserModal} data={listUser} />
      </Form.Provider>
    </>
  );
};
export default RegisterProject;
