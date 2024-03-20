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
// sơ duyệt
import {
  getTopicReviewerAPI,
  createMemberDecision,
  getReviewedByMember,
} from "../../../services/api";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";
// import ModalInfor from "../../modalInfor.jsx";
const ProjectManagerUser = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRejOpen, setIsModalRejOpen] = useState(false);
  const [data, setDataUser] = useState({});
  const [dataPro, setDataPro] = useState({});
  const [status, setStatus] = useState(false);
  const [activeTab, setActiveTab] = useState("notyet");
  const [dataTopicForMember, setdataTopicForMember] = useState([]);
  useEffect(() => {
    getTopicReviewer();
  }, [status]);
  const items = [
    {
      key: "notyet",
      label: `Chưa duyệt`,
      children: <></>,
    },
    {
      key: "done",
      label: `Đã duyệt`,
      children: <></>,
    },
  ];
  const getTopicReviewer = async () => {
    try {
      const res = await getTopicReviewerAPI({
        memberId: "31c63d57-eeb2-4e03-bc8d-1689d5fb3d87", // Nguyen Van A
      });
      if (res && res?.data) {
        setdataTopicForMember(res.data);
      } else {
        console.log("ko load dc api");
      }
    } catch (error) {
      console.log("có lỗi tại getTopicReviewe: ", error);
    }
  };
  const getTopicHadReviwed = async () => {
    try {
      const res = await getReviewedByMember({
        memberId: "31c63d57-eeb2-4e03-bc8d-1689d5fb3d87", // Nguyen Van A
      });
      if (res && res?.data) {
        setdataTopicForMember(res.data);
      } else {
        console.log("ko load dc api");
      }
    } catch (error) {
      console.log("có lỗi tại getTopicReviewe: ", error);
    }
  };
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
  const handleOnClickApprove = (id) => {
    const param = {
      memberReviewId: "31c63d57-eeb2-4e03-bc8d-1689d5fb3d87",
      topicId: id,
      isApproved: true,
      reason: null,
    };
    createMemberDecision(param)
      .then((data) => {
        if (data) {
          setStatus(true);
        } else {
          setStatus(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
      dataIndex: "topicName",
      key: "topicName",
      ...getColumnSearchProps("topicName"),
      width: "30%",
    },
    {
      title: "Lĩnh Vực",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Ngày",
      render: (text, record, index) => {
        return <div>{dayjs(record.createdAt).format(dateFormat)}</div>;
      },
      key: "createdAt",
    },
    {
      title: "Hành động",
      render: (text, record, index) => {
        const style1 = {
          color: "blue",
          fontSize: "1.5em",
          cursor: "pointer",
        };
        const style2 = {
          color: "green",
          fontSize: "1.5em",
          margin: "0 10px",
          cursor: "pointer",
        };
        const style3 = {
          color: "red",
          fontSize: "1.5em",
          cursor: "pointer",
        };
        return (
          <div style={{ textAlign: "center" }}>
            <InfoCircleOutlined
              style={style1}
              onClick={() => {
                setIsModalOpen(true);
                setDataUser(record);
              }}
            />
            {activeTab === "notyet" && (
              <>
                {" "}
                <CheckOutlined
                  onClick={() => handleOnClickApprove(record.topicId)}
                  style={style2}
                />
                <CloseOutlined
                  style={style3}
                  onClick={() => {
                    setDataPro(record);
                    setIsModalRejOpen(true);
                  }}
                />
              </>
            )}
            {activeTab === "done" && (
              <>
                <p
                  style={{
                    backgroundColor: record.memberDecision ? "green" : "red",
                    color: "white",
                    display: "inline-block",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    marginTop: "8px",
                    margin: "0 10px",
                  }}
                >
                  {record.memberDecision ? "Đồng ý" : "Từ chối"}
                </p>
              </>
            )}
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
          setActiveTab(value);
          if (value === "done") {
            getTopicHadReviwed();
          } else {
            getTopicReviewer();
          }
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
        dataSource={dataTopicForMember}
        onChange={onChange}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
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
        userId="31C63D57-EEB2-4E03-BC8D-1689D5FB3D87"
        data={dataPro}
        isModalRejOpen={isModalRejOpen}
        setIsModalRejOpen={setIsModalRejOpen}
        status={status}
        setStatus={setStatus}
      />
    </div>
  );
};

export default ProjectManagerUser;
