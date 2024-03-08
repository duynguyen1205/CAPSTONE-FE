import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  ConfigProvider,
  Input,
  List,
  Popover,
  Space,
  Table,
  message,
} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import Highlighter from "react-highlight-words";
import "../../user/project/table.scss";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  GroupOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ModalPickTimeLeader from "./ModalPickTimeLeader";
import { getAllUser } from "../../../services/api";
import ModalPickTime from "./ModalPickTime";
const AddMemberApprove = () => {
  const [selectedUser, setSelectedUser] = useState([]);
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
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [maxSelectedMembers, setMaxSelectedMembers] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const isRowDisabled = (record) => {
    // Check if the row should be disabled based on the number of selected members
    return (
      selectedKeys.length >= maxSelectedMembers &&
      !selectedKeys.includes(record.key)
    );
  };
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
      dataIndex: "fullName",
      ...getColumnSearchProps("fullName"),
      sorter: (a, b) => a.fullName.length - b.fullName.length,
    },

    {
      title: "Chức vụ",
      dataIndex: "position",
    },
    {
      title: "Bằng cấp",
      dataIndex: "degree",
    },
    {
      title: "Email",
      dataIndex: "accountEmail",
      key: "email",
      render: (text, record) => (
        <Space>
          {showFullData[record.key] ? (
            <p>{record.accountEmail}</p>
          ) : (
            <p>{maskEmail(record.accountEmail, false)}</p>
          )}
        </Space>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",

      render: (text, record) => (
        <Space>
          {showFullData[record.key] ? (
            <p>{record.phoneNumber}</p>
          ) : (
            <p>{maskPhoneNumber(record.phoneNumber)}</p>
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
  const getUserAPI = async () => {
    try {
      const res = await getAllUser();
      setIsLoading(true);
      if (res && res?.data) {
        const dataKey = res.data.map((item) => ({
          ...item,
          key: item.id,
        }));
        setUser(dataKey);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching get user:", error);
    }
  };
  useEffect(() => {
    getUserAPI();
  }, []);
  const navigate = useNavigate();

  // xử lý hội đồng sơ duyệt
  const onSubmit = () => {
    // Ví dụ: Hiển thị thông báo thành công
    setModalVisible(true)
  };
  // xử lý hội đồng đánh giá
  const onSubmitCouncil = () => {};
  // hide email and phone munber
  const maskEmail = (accountEmail) => {
    const [username, domain] = accountEmail.split("@");
    const maskedUsername = `${username.substring(0, 3)}****`;

    return `${maskedUsername}@${domain}`;
  };

  const maskPhoneNumber = (phoneNumber) => {
    return `${phoneNumber.substring(0, 3)}****${phoneNumber.substring(
      phoneNumber.length - 3
    )}`;
  };

  const maskData = (user, showFull) => {
    return user.map((item) => ({
      ...item,
      accountEmail: maskEmail(item.accountEmail, showFull),
      phoneNumber: maskPhoneNumber(item.phoneNumber, showFull),
    }));
  };

  const maskedData = maskData(user, false);

  const handleToggleShowFullData = (key) => {
    setShowFullData((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // Update the selected row keys
      setSelectedKeys(selectedRowKeys);
      setSelectedUser(selectedRows);
    },
    hideSelectAll: true,
    selectedKeys,
    getCheckboxProps: (record) => ({
      disabled: isRowDisabled(record),
    }),
  };
  const hasSelected = selectedUser.length > 0;
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
          {path === "add-council" &&
            (setMaxSelectedMembers(7),
            (
              <Button
                disabled={selectedUser.length < 2 || selectedUser.length % 2 === 0}
                shape="round"
                type="primary"
                onClick={() => {
                  onSubmitCouncil();
                  setIsModalOpen(true);
                }}
              >
                Thêm thành viên đánh giá
              </Button>
            ))}
          {path === "add-member" &&
            (setMaxSelectedMembers(5),
            (
              <Button
                disabled={selectedUser.length < 2 || selectedUser.length % 2 === 0}
                shape="round"
                type="primary"
                onClick={onSubmit}
              >
                Thêm thành viên phê duyệt
              </Button>
            ))}
        </ConfigProvider>
      </Space>
    </div>
  );
  const listUser = (
    <div>
      <List
        bordered
        dataSource={selectedUser}
        renderItem={(selectedUser) => (
          <List.Item>
            {selectedUser.fullName} - {selectedUser.position}
          </List.Item>
        )}
      />
    </div>
  );
  return (
    <div>
      <h2 style={{ fontWeight: "bold", fontSize: "30px", color: "#303972" }}>
        Danh sách nhà khoa học
      </h2>
      <p style={{ color: "red" }}>
        Lưu ý khi chọn thành viên đánh giá là số lẻ vd 3, 5, 7
      </p>
      <span
        style={{
          marginLeft: 8,
        }}
      >
        {" "}
        {hasSelected ? (
          <div>
            <Space direction="" size={"middle"}>
              <Popover content={listUser} title="Nhà khoa học đã chọn">
                <Badge count={selectedUser.length}>
                  <GroupOutlined style={{ fontSize: "20px", color: "#08c" }} />
                </Badge>
              </Popover>
              <p>Đã chọn {selectedUser.length} nhà khoa học</p>
            </Space>
          </div>
        ) : (
          ""
        )}
      </span>
      <div>
        <Table
          rowClassName={(record, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-dark"
          }
          bordered={true}
          rowSelection={{
            ...rowSelection,
          }}
          columns={columns}
          dataSource={showFullData ? user : maskedData}
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
      </div>

      {/* modal pick time and leader */}
      <ModalPickTimeLeader
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      {/* modal pick time for member approval */}
      <ModalPickTime
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        dataUser={selectedUser}
      />
    </div>
  );
};

export default AddMemberApprove;
