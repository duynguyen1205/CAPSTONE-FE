import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Modal,
    Row,
  } from "antd";
import { useEffect } from "react";

const ModalInfor = (props) => {
  const isModalOpen = props.isModalOpen;
  const [form] = Form.useForm();

  const data = props.data;
  console.log("check data: ", data);
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  // set up initial value for the form
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  return (
    <>
      <Modal
        title="Thông tin đề tài"
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
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
              <Form.Item name="key" label="Tên đề tài" labelCol={{ span: 24 }}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="name" label="Chủ nhiệm" labelCol={{ span: 24 }}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="number" label="Số lượng thành viên" labelCol={{ span: 24 }}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="field" label="Lĩnh vực nghiên cứu" labelCol={{ span: 24 }}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="council"
                label="Hội đồng xét duyệt"
                labelCol={{ span: 24 }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="decision"
                label="Tài liệu đính kèm"
                labelCol={{ span: 24 }}
              >
                
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ModalInfor;