import React, { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  message,
  Upload,
  ConfigProvider,
  Popover,
  Badge,
  List,
} from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import ModalAddMember from "./ModalAddMember";
import {
  createTopicAPI,
  getAllCategory,
  getAllUser,
  uploadFile,
} from "../../../services/api";
import "./register.scss";
import { useNavigate } from "react-router-dom";
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";
const today = dayjs();
const RegisterProject = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [newTopicFiles, setFileList] = useState([]);
  const [addMember, setAddMember] = useState([]);
  const navigate = useNavigate();
  const showUserModal = () => {
    setOpen(true);
  };
  const hideUserModal = () => {
    setOpen(false);
  };
  const listUserReview = (
    <div>
      <List
        bordered
        dataSource={addMember}
        renderItem={(addMember) => (
          <List.Item>
            {addMember.email} -{" "}
            {addMember.role === "1" ? "Thành viên" : "Thư kí"}
          </List.Item>
        )}
      />
    </div>
  );

  const selectAfter = (
    <Select
      defaultValue={"VND"}
      style={{
        width: 100,
      }}
    >
      <Option value="VND">VND</Option>
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
        if (response.data[0].fileLink === null) {
          onError(response, file);
          message.error(`${file.name} file uploaded unsuccessfully.`);
        } else {
          setFileList((fileList) => [
            ...fileList,
            {
              uid: file.uid,
              fileName: response.data[0].fileName,
              fileLink: response.data[0].fileLink,
            },
          ]);
          // Gọi onSuccess để xác nhận rằng tải lên đã thành công
          onSuccess(response, file);
          // Hiển thị thông báo thành công
          message.success(`${file.name} file uploaded successfully.`);
        }
      } catch (error) {
        // Gọi onError để thông báo lỗi nếu có vấn đề khi tải lên
        onError(error);
        // Hiển thị thông báo lỗi
        message.error(`${file.name} file upload failed.`);
      }
    },
    onRemove: (file) => {
      const fileFilter = newTopicFiles.filter((x) => x.uid !== file.uid);
      setFileList(fileFilter);
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
    const user = addMember;
    const emailToIdMap = {};
    listUser.forEach((item) => {
      emailToIdMap[item.accountEmail] = item.id;
    });
    const newData = user.map((item) => {
      const userId = emailToIdMap[item.email];
      const newItem = { userId, ...item };
      delete newItem.email;
      newItem.role = Number(newItem.role);
      return newItem;
    });
    const creatorId = "a813f937-8c3a-40e8-b39e-7b1e0dd962f7"; // Ngô Minh G
    const { categoryId, topicName, description, budget, startTime } = values;
    const updatedFileFilter = newTopicFiles.map(({ uid, ...rest }) => rest);
    const data = {
      categoryId: categoryId,
      creatorId: creatorId,
      topicName: topicName,
      description: description,
      budget: budget.toString(),
      memberList: newData,
      newTopicFiles: updatedFileFilter,
      startTime: dayjs(startTime).utc().format(),
    };
    try {
      const res = await createTopicAPI(data);
      if (res && res.isSuccess) {
        message.success("Tạo topic thành công");
        setFileList([]);
        setAddMember([]);
        form.resetFields();
        navigate("/user/track");
      }
    } catch (error) {
      console.error("lỗi thêm mới topic", error.message);
    }
  };
  const checkUser = addMember.length > 0;
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
              labelCol={{ span: 24 }}
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
              labelCol={{ span: 24 }}
            >
              <TextEditor />
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
              labelCol={{ span: 24 }}
            >
              <InputNumber
                className="text-align-input"
                style={{ width: 230 }}
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                addonAfter={selectAfter}
              />
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
              labelCol={{ span: 24 }}
            >
              <Select
                style={{ width: 200 }}
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
            {checkUser ? (
              <div>
                <Space direction="" size={"middle"}>
                  <Popover content={listUserReview} title="Thành viên đã chọn">
                    <Badge count={addMember.length}>
                      <UsergroupAddOutlined
                        style={{ fontSize: "20px", color: "#08c" }}
                      />
                    </Badge>
                  </Popover>
                  <p>Đã chọn {addMember.length} thành viên</p>
                </Space>
              </div>
            ) : (
              ""
            )}
          </Col>
          <Col span={12}>
            <Form.Item
              name="startTime"
              label="Thời gian bắt đầu dự kiến: "
              rules={[
                {
                  required: true,
                  message: "Xin hãy chọn thời gian bắt đầu dự kiến",
                },
              ]}
            >
              <DatePicker format={dateFormat} minDate={today} />
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
                  <Form.Item name="group1" label="Thành viên đào tạo (nếu có):">
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
              <Upload
                {...props}
                listType="picture"
                className="upload-list-inline"
              >
                <Button icon={<InboxOutlined />}>Tải tài liệu lên</Button>
              </Upload>
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
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
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
      <ModalAddMember
        open={open}
        onCancel={hideUserModal}
        data={listUser}
        setAddMember={setAddMember}
      />
    </>
  );
};
export default RegisterProject;
