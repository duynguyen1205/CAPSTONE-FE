import React, { useState } from "react";
import { Button, ConfigProvider, Space, Table, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import ModalPickTime from "./ModalPickTime";
const AddMemberApprove = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [user, setUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // check path
  const location = useLocation();
  let path = location.pathname.split("/");
  path = path[3];
  console.log("====================================");
  console.log("check path: ", path);
  console.log("====================================");
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Chức vụ",
      dataIndex: "position",
    },
    {
      title: "Khoa",
      dataIndex: "department",
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
    const status = true;
    const users = [];
    data.forEach((items) => {
      if (selectedRowKeys.includes(items.key)) {
        users.push(items);
      }
      setUser(users);
    });
    console.log("check list user", user);
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
        Danh sách nhân viên
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
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
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
