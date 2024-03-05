import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Input, Space, Table, Tabs } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import "../../staff/project/project.scss";
import { useNavigate } from "react-router-dom";
import ModalInfor from "./ModalInfor";
import "./table.scss";
import ModalReject from "./ModalReject";
import { getTopicReviewerAPI } from "../../../services/api";
// import ModalInfor from "../../modalInfor.jsx";
const ProjectManagerUser = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRejOpen, setIsModalRejOpen] = useState(false);
  const [data, setDataUser] = useState({});
  const [dataPro, setDataPro] = useState({});
  const [topic, setTopic] = useState([]);
  const [activeTab, setActiveTab] = useState("notyet");
  const userId = "9645623f-dec0-4741-be28-0baeb1590c8c";
  const navigate = useNavigate();
  useEffect(() => {
    getTopicReview(userId);
  }, [activeTab]);
  const items = [
    {
      key: "notyet",
      label: `Chưa duyệt`,
      children: <></>,
    },
    {
      key: "chohoidong",
      label: `Đã duyệt`,
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
      name: "Nghiên cứu và phát triển công nghệ vi sinh học",
      age: 32,
      field: "Nghiên cứu bệnh lý",
      date: "03-04-2024",
    },
    {
      key: "2",
      name: "Nghiên cứu và phát triển công nghệ vi sinh học",
      age: 42,
      field: "Nghiên cứu bệnh lý",
      date: "03-04-2024",
    },
    {
      key: "3",
      name: "Nghiên cứu và phát triển công nghệ vi sinh học",
      age: 42,
      field: "Nghiên cứu bệnh lý",
      date: "03-04-2024",
    },
    {
      key: "4",
      name: "Nghiên cứu và phát triển công nghệ vi sinh học",
      age: 42,
      field: "Nghiên cứu bệnh lý",
      date: "03-04-2024",
    },
    {
      key: "5",
      name: "Nghiên cứu và phát triển công nghệ vi sinh học",
      age: 42,
      field: "Nghiên cứu bệnh lý",
      date: "03-04-2024",
    },
    {
      key: "6",
      name: "Nghiên cứu và phát triển công nghệ vi sinh học",
      age: 42,
      field: "Nghiên cứu bệnh lý",
      date: "03-04-2024",
    },
    {
      key: "7",
      name: "Nghiên cứu và phát triển công nghệ vi sinh học",
      age: 42,
      field: "Nghiên cứu bệnh lý",
      date: "03-04-2024",
    },
    {
      key: "8",
      name: "Nghiên cứu và phát triển công nghệ vi sinh học",
      age: 42,
      field: "Nghiên cứu bệnh lý",
      date: "03-04-2024",
    },
    {
      key: "9",
      name: "Nghiên cứu và phát triển công nghệ vi sinh học",
      age: 42,
      field: "Nghiên cứu bệnh lý",
      date: "03-04-2024",
    },
    {
      key: "10",
      name: "Duy",
      age: 42,
      field: "Nghiên cứu bệnh lý",
      date: "03-04-2024",
    },
  ];
  const columns = [
    {
      title: "ID",
      key: "index",
      render: (text, record, index) => index + 1,
      color: "red",
      width: "10%",
    },
    {
      title: "Tên Đề Tài",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      width: "30%",
    },
    {
      title: "Lĩnh Vực",
      dataIndex: "field",
      key: "field",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Hành động",
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
              <CheckOutlined style={style2} />
              <CloseOutlined
                style={style3}
                onClick={() => {
                  setDataPro(record);
                  setIsModalRejOpen(true);
                }}
              />
            </Space>
          </div>
        );
      },
      align: "center",
    },
  ];
  const getTopicReview = async (ID) => {
    try {
      const res = await getTopicReviewerAPI(ID);
      if (res && res?.data) {
        setTopic(res.data);
      }
    } catch (error) {
      console.error("Error get topic list:", error);
    }
  };


  const renderHeader = () => (
    <div>
      <Tabs
        defaultActiveKey="notyet"
        items={items}
        onChange={(value) => {
          setActiveTab(value);
        }}
        style={{ overflowX: "auto", marginLeft: "30px" }}
      />
    </div>
  );
  //search
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
  return (
    <div>
      <h2 style={{ fontWeight: "bold", fontSize: "30px", color: "#303972" }}>
        Danh sách đề tài chờ sơ duyệt
      </h2>
      <Table
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        bordered={true}
        columns={columns}
        dataSource={topic}
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
      <ModalInfor
        data={data}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <ModalReject
        data={dataPro}
        isModalRejOpen={isModalRejOpen}
        setIsModalRejOpen={setIsModalRejOpen}
      />
    </div>
  );
};

export default ProjectManagerUser;
