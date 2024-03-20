import { Button, Col, Divider, Form, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { getTopicDetailAPI } from "../../../services/api";

const ModalInfor = (props) => {
  const isModalOpen = props.isModalOpen;
  const [form] = Form.useForm();
  const [topicLink, setTopicLink] = useState([]);
  const data = props.data;
  const topicId = props.data.topicId;
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  const getTopicDetail = async () => {
    try {
      const res = await getTopicDetailAPI({
        topicId: topicId,
      });
      if (res && res.isSuccess) {
        setTopicLink(
          res.data.topicFiles.map((item) => ({
            name: item.topicFileName,
            link: item.topicFileLink,
          }))
        );
        form.setFieldsValue(res.data);
      }
    } catch (error) {
      console.log("Error getting topic detail: ", error);
    }
  };
  // set up initial value for the form
  useEffect(() => {
    getTopicDetail();
  }, [isModalOpen === true]);
  return (
    <>
      <Modal
        title="Thông tin đề tài"
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        forceRender
        footer={[
          <Button key="back" onClick={handleCancel}>
            Thoát
          </Button>,
        ]}
      >
        <Divider />
        <Form form={form} name="basic">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="topicName"
                label="Tên đề tài"
                labelCol={{ span: 24 }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="topicLeaderName"
                label="Chủ nhiệm"
                labelCol={{ span: 24 }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="numberOfMember"
                label="Số lượng thành viên"
                labelCol={{ span: 24 }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="categoryName"
                label="Lĩnh vực nghiên cứu"
                labelCol={{ span: 24 }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả chi tiết"
                labelCol={{ span: 24 }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="document"
                label="Tài liệu đính kèm"
                labelCol={{ span: 24 }}
              >
                {topicLink.map((item, index) => (
                  <span key={index}>
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel={item.name}
                    >
                      {item.name}
                    </a>
                    <br />
                  </span>
                ))}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ModalInfor;
