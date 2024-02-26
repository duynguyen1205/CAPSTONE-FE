import React, { useEffect, useState } from "react";
import {
  Button,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Modal,
  message,
  notification,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";

const ModalUpload = (props) => {
  const isModalOpen = props.isModalOpen;
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [fileList, setFileList] = useState([]);
  const data = props.data;
  console.log("check data: ", data);
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.setDataUser({});
    props.setIsModalOpen(false);
    setFileList([]);
  };

  const onSubmit = async (values) => {};
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };
  const propsUpload = {
    name: "file",
    multiple: true,
    fileList,
    customRequest: dummyRequest,
    onChange(info) {
      const { status } = info.file;
      setFileList(info.fileList);
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

  // set up initial value for the form
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  return (
    <>
      <Modal
        title="Góp ý của hội đồng"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isSubmit}
        maskClosable={false}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Quay về
          </Button>,
          <Button key="submit" type="primary" danger onClick={handleOk}>
            Chỉnh sửa
          </Button>,
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#41C221",
              },
            }}
          >
            <Button type="primary" onClick={handleOk}>
              Bắt đầu thực hiện
            </Button>
          </ConfigProvider>,
        ]}
      >
        <Divider />
        <Form form={form} name="basic" onFinish={onSubmit}>
          <Form.Item name="key" label="ID đề tài" labelCol={{ span: 24 }}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="name" label="leader" labelCol={{ span: 24 }}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="Mô tả tài liệu"
            label="password"
            labelCol={{ span: 24 }}
            type="password"
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Dragger {...propsUpload}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalUpload;
