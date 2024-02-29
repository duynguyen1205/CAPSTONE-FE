import React, { useRef, useState } from "react";
import { Button, ConfigProvider, Input, Space, Table, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import ModalPickTime from "./ModalPickTime";
import Highlighter from "react-highlight-words";
import "../../user/project/table.scss";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
const AddMemberApprove = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [user, setUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [showFullData, setShowFullData] = useState({});
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  // check path
  const location = useLocation();
  let path = location.pathname.split("/");
  path = path[3];
  // search in table
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
      title: "Tên",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
    },

    {
      title: "Chức vụ",
      dataIndex: "position",
    },
    {
      title: "Khoa",
      dataIndex: "department",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <Space>
          {showFullData[record.key] ? (
            <p>{record.email}</p>
          ) : (
            <p>{maskEmail(record.email, false)}</p>
          )}
        </Space>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",

      render: (text, record) => (
        <Space>
          {showFullData[record.key] ? (
            <p>{record.phone}</p>
          ) : (
            <p>{maskPhoneNumber(record.phone)}</p>
          )}
          
        </Space>
      ),
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Button
          icon={
            showFullData[record.key] ? (
              <EyeInvisibleOutlined />
            ) : (
              <EyeOutlined />
            )
          }
          onClick={() => handleToggleShowFullData(record.key)}
        />
      ),
    },
  ];

  const navigate = useNavigate();
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      phone: "09080878661",
      position: "Bác sĩ",
      department: "Khoa răng hàm mặt",
      email: "duy56236@gmail.com",
    });
  }
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  // xử lý hội đồng sơ duyệt
  const onSubmit = () => {
    const status = true;
    const users = [];
    data.forEach((items) => {
      if (selectedRowKeys.includes(items.key)) {
        users.push(items);
      }
      setUser(users);
    });
    if (status) {
      message.success("Tạo thành viên hội đồng thành công");
      navigate("/staff/manager");
    }
    console.log("check list user", user);
  };
  // xử lý hội đồng đánh giá
  const onSubmitCouncil = () => {
    const users = [];
    data.forEach((items) => {
      if (selectedRowKeys.includes(items.key)) {
        users.push(items);
      }
      setUser(users);
    });
    console.log("check list user", user);
  };
  // hide email and phone munber
  const maskEmail = (email) => {
    const [username, domain] = email.split("@");
    const maskedUsername = `${username.substring(0, 3)}****`;
    return `${maskedUsername}@${domain}`;
  };

  const maskPhoneNumber = (phone) => {
    return `${phone.substring(0, 3)}****${phone.substring(phone.length - 3)}`;
  };

  const maskData = (data, showFull) => {
    return data.map((item) => ({
      ...item,
      email: maskEmail(item.email, showFull),
      phone: maskPhoneNumber(item.phone, showFull),
    }));
  };

  const maskedData = maskData(data, false);

  const handleToggleShowFullData = (key) => {
    setShowFullData((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => {
      if (selectedRowKeys.length > 4 && path === "add-member") {
        return {
          disabled: !selectedRowKeys.includes(record.key),
        };
      }
    },
    hideSelectAll: true,
  };
  const hasSelected = selectedRowKeys.length > 0;
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
  const renderFooter = () => (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Space>
        <Button
          shape="round"
          type="primary"
          danger
          onClick={() => navigate("/staff/manager")}
        >
          Quay về
        </Button>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#55E6A0",
            },
          }}
        >
          {" "}
          {path === "add-council" && (
            <Button
              disabled={hasSelected < 1}
              shape="round"
              type="primary"
              onClick={() => {
                onSubmitCouncil();
                setIsModalOpen(true);
              }}
            >
              Thêm thành viên đánh giá
            </Button>
          )}
          {path === "add-member" && (
            <Button
              disabled={hasSelected < 1}
              shape="round"
              type="primary"
              onClick={() => onSubmit()}
            >
              Thêm thành viên phê duyệt
            </Button>
          )}
        </ConfigProvider>
      </Space>
    </div>
  );

  return (
    <div>
      <h2 style={{ fontWeight: "bold", fontSize: "30px", color: "#303972" }}>
        Danh sách nhà khoa học
      </h2>
      <span
        style={{
          marginLeft: 8,
          marginBottom: 8,
        }}
      >
        {hasSelected ? `Đã chọn ${selectedRowKeys.length} nhân viên` : ""}
      </span>
      <Table
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        bordered={true}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={showFullData ? data : maskedData}
        onChange={onChange}
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
        footer={renderFooter}
      />

      {/* modal pickdate */}
      <ModalPickTime
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default AddMemberApprove;
