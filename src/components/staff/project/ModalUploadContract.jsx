import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadContract, uploadFile } from "../../../services/api";
import { useNavigate } from "react-router-dom";

const ModalUploadContract = (props) => {
  const isModalOpen = props.isModalContractOpen;
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [newTopicFiles, setFileList] = useState([]);
  const data = props.data;
  const navigate = useNavigate()
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.setDataUser({});
    props.setIsModalContractOpen(false);
    setFileList([]);
    form.resetFields();
  };

  const onSubmit = async (values) => { 
    if(newTopicFiles.length <= 0) {
      message.error("Xin hãy tải biên bản cuộc họp lên");
      return;
    }
    const param = {
      topicId: data.topicId,
      newFiles: newTopicFiles,
    }
    console.log(param)
    try {
      const res = await uploadContract(param);
      setIsSubmit(true);
      if(res && res.message) {
        setIsSubmit(false);
        message.success("Tải hợp đồng lên thành công");
        navigate("/staff")
      }
    } catch (error) {
      console.log('====================================');
      console.log("có lỗi tại upload result", error.message);
      console.log('====================================');
    }
  };
  const propsUpload = {
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

  // set up initial value for the form
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  return (
    <>
      <Modal
        title="Hợp đồng"
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
        <Divider />
        <Form form={form} name="basic" onFinish={onSubmit}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name="code" label="ID đề tài" labelCol={{ span: 24 }}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="topicName"
                label="Tên đề tài"
                labelCol={{ span: 24 }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="comment"
                label="Hợp đồng"
                labelCol={{ span: 24 }}
              >
                <Upload {...propsUpload}>
                  <Button icon={<UploadOutlined />}>
                    Ấn vào để tải hợp đồng lên
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ModalUploadContract;
