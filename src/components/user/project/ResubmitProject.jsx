import { Col, Form, Input, Row, Table, Space, Button } from "antd";
import "./table.scss";
import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const ResubmitProject = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setDataUser] = useState({});
  const [dataPro, setDataPro] = useState({});
  const [status, setStatus] = useState(false);
  const [dataTopicForCouncil, setdataTopicForCouncil] = useState([]);
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Giai đoạn",
      key: "giaidoan",
      dataIndex: "code",
      width: "10%",
    },
    {
      title: "Góp ý của hội đồng",
      dataIndex: "gopy",
      key: "gopy",
      width: "30%",
    },
    {
      title: "File chỉnh sửa",
      dataIndex: "File",
      key: "file",
    },
    {
      title: "Hạn nộp",
      render: (text, record, index) => {
        return <div>{dayjs(record.createdAt).format(dateFormat)}</div>;
      },
      key: "date",
      width: "10%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "10%",
    },

    {
      title: "Chi tiết",
      width: "10%",
      render: (text, record, index) => {
        const style1 = {
          color: "blue",
          fontSize: "1.5em",
          margin: "0 20",
          cursor: "pointer",
        };
        const style2 = {
          color: "green",
          fontSize: "1.5em",
          margin: "0 20",
          cursor: "pointer",
        };
        const style3 = {
          color: "red",
          fontSize: "1.5em",
          margin: "0 20",
          cursor: "pointer",
        };
        return (
          <div>
            <Space size={"middle"}>
              <InfoCircleOutlined
                style={style1}
                onClick={() => {
                  setIsModalOpen(true);
                  setDataUser(record);
                }}
              />
            </Space>
          </div>
        );
      },
      align: "center",
    },
  ];
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
    console.log("parms: ", pagination, filters, sorter, extra);
  };
  const [form] = Form.useForm();
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
        Bổ sung tài liệu
      </h2>
      <Form form={form} name="basic">
        <Row gutter={20}>
          <Col span={16}>
            <Form.Item
              name="topicName"
              label="Tên đề tài"
              labelCol={{ span: 24 }}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
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
              name="document"
              label="Bảng góp ý của đề tài"
              labelCol={{ span: 24 }}
            ></Form.Item>
          </Col>
        </Row>
        <Table
          rowClassName={(record, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-dark"
          }
          bordered={true}
          columns={columns}
          dataSource={dataTopicForCouncil}
          onChange={onChange}
          rowKey={"_id"}
          pagination={{
            current: current,
            pageSize: pageSize,
            showSizeChanger: true,
            total: total,
            pageSizeOptions: ["5", "10", "15"],
            showTotal: (total, range) => {
              return (
                <div>
                  {range[0]} - {range[1]} on {total} rows
                </div>
              );
            },
          }}
          loading={isLoading}
        />
      </Form>
    </>
  );
};
export default ResubmitProject;
