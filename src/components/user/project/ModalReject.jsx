import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Row,
  message,
} from "antd";
import { createDeanMakeDecesion, createMemberDecision } from "../../../services/api";
import { useLocation } from "react-router-dom";
const { TextArea } = Input;
const ModalReject = (props) => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const location = useLocation();
  const data = props.data;
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.setIsModalRejOpen(false);
    form.resetFields();
  };
  const isModalOpen = props.isModalRejOpen;
  const onSubmit = async (values) => {
    if (location.pathname === "/user/manager") {
      const param = {
        memberReviewId: "31c63d57-eeb2-4e03-bc8d-1689d5fb3d87",
        topicId: data.topicId,
        isApproved: false,
        reason: values.comment,
      };
      createMemberDecision(param)
        .then((data) => {
          message.success("Tạo đánh giá thành công");
          if (props.status === true) {
            props.setStatus(false);
          } else {
            props.setStatus(true);
          }
          handleCancel();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const param = {
        diciderId: props.userId,
        topicId: data.topicId,
        deanDecision: false,
        rejectReason: values.comment,
      };
      createDeanMakeDecesion(param)
        .then((data) => {
          message.success("Tạo đánh giá thành công");
          if (props.status === true) {
            props.setStatus(false);
          } else {
            props.setStatus(true);
          }
          handleCancel();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // set up initial value for the form
  useEffect(() => {
    form.setFieldsValue(data);
  }, [isModalOpen === true]);
  return (
    <>
      <Modal
        title="Lý do từ chối"
        onCancel={handleCancel}
        open={isModalOpen}
        confirmLoading={isSubmit}
        maskClosable={false}
        forceRender
        footer={[
          <Button key="back" onClick={handleCancel}>
            Thoát
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
        <Form form={form} name="basic" onFinish={onSubmit}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                name="topicId"
                label="ID đề tài"
                labelCol={{ span: 24 }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
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
                label="Lý do từ chối thực hiện"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy cho biết lý do từ chối!",
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
    </>
  );
};
export default ModalReject;
