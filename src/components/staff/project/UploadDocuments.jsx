import { SearchOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Space, Table, Tabs, Tag } from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import "./project.scss";
import { useNavigate } from "react-router-dom";
import ModalUpload from "./ModalUpload";
const UploadDocument = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setDataUser] = useState({});
  const navigate = useNavigate();
  const items = [
    {
      key: "confirm",
      label: `Chờ xác nhận`,
      children: <></>,
    },
    {
      key: "submitted",
      label: `Đã nộp`,
      children: <></>,
    },
  ];
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
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "Nghiên cứu bệnh lý",
      date: "03-04-2024",
      tags: ["Chưa được duyệt"],
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "Nghiên cứu bệnh lý",
      date: "03-04-2024",
      tags: ["Chưa được duyệt"],
    },
    {
      key: "3",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      date: "03-04-2024",
      tags: ["Chưa được duyệt"],
    },
    {
      key: "4",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      date: "03-04-2024",
      tags: ["Chưa được duyệt"],
    },
    {
      key: "5",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      date: "03-04-2024",
      tags: ["Chưa được duyệt"],
    },
    {
      key: "6",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      date: "03-04-2024",
      tags: ["Chưa được duyệt"],
    },
    {
      key: "7",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      date: "03-04-2024",
      tags: ["Chưa được duyệt"],
    },
    {
      key: "8",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      date: "03-04-2024",
      tags: ["Chưa được duyệt"],
    },
    {
      key: "9",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      date: "03-04-2024",
      tags: ["Chưa được duyệt"],
    },
    {
      key: "10",
      name: "Duy",
      age: 42,
      address: "10 Downing Street",
      date: "03-04-2024",
      tags: ["Chưa được duyệt"],
    },
  ];
  const columns = [
    {
      title: "No.",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Id",
      key: "index",
      render: (text, record, index) => index + 1,
      backgroundColor: "green",
    },
    {
      title: "Tên Đề Tài",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Trạng thái",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "volcano" : "green";
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Lĩnh Vực",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Hành động",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "center" }}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#55E6A0",
                },
              }}
            >
              <Button
                shape="round"
                type="primary"
                onClick={() => {
                  setDataUser(record);
                  setIsModalOpen(true);
                }}
              >
                Tải kết quả
              </Button>
            </ConfigProvider>
          </div>
        );
      },
      align: "center",
    },
  ];
  const renderHeader = () => (
    <div>
      <Tabs
        defaultActiveKey="notyet"
        items={items}
        onChange={(value) => {
          setSortQuery(value);
        }}
        style={{ overflowX: "auto", marginLeft: "30px" }}
      />
    </div>
  );
  //search
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  return (
    <div>
      <h2 style={{ fontWeight: "bold", fontSize: "30px", color: "#303972" }}>
        Danh sách đề tài
      </h2>
      <Table
        columns={columns}
        dataSource={dataSource}
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
        title={renderHeader}
        loading={isLoading}
      />

      <ModalUpload
        data={data}
        setDataUser={setDataUser}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default UploadDocument;