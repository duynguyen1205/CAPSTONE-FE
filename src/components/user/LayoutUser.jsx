import {
  HomeOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Dropdown,
  Space,
  message,
  Avatar,
  theme,
  ConfigProvider,
} from "antd";
import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "./user.scss";
import logo from "../../assets/logoBV.png";
const { Header, Content, Sider } = Layout;
const items = [
  {
    label: <Link to="/user">Bảng điều khiển</Link>,
    key: "dashboard",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/user/manager">Quản lý</Link>,
    key: "manager",
    icon: <UnorderedListOutlined />,
  },
  {
    label: <Link to="/user/upload-document">Tải tài liệu lên </Link>,
    key: "upload-document",
    icon: <UploadOutlined />,
  },
  {
    label: <Link to="/user/profile">Hồ sơ cá nhân</Link>,
    key: "profile",
    icon: <UserOutlined />,
  },
];

const LayoutUser = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();
  const handleLogout = async () => {
    message.success("Logged out successfully");
    navigate("/login");
  };

  const itemDropdown = [
    {
      label: <label>Account Manager</label>,
      key: "account",
    },
    {
      label: <a href="/">Home Page</a>,
      key: "homepage",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Log out
        </label>
      ),
      key: "logout",
    },
  ];
  const location = useLocation();
  let path = location.pathname.split("/");
  path = path[2];
  if (path === undefined) {
    path = "dashboard";
  }
  return (
    <Layout className="layout-staff">
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              colorBgContainer: "#42BC81",
              colorText: "#FFFFFF",
              colorPrimary: "#070707",
            },
          },
        }}
      >
        <Sider>
          <div style={{ margin: 16, textAlign: "center" }}>
            {" "}
            <img
              style={{ height: 100, width: 130 }}
              src={logo}
              alt="logo bệnh viện"
            />
          </div>
          <Menu
            defaultSelectedKeys={[activeMenu]}
            selectedKeys={path}
            mode="inline"
            items={items}
            onClick={(e) => setActiveMenu(e.key)}
          />
        </Sider>
      </ConfigProvider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="staff-header">
            <Dropdown
              menu={{
                items: itemDropdown,
              }}
              trigger={["click"]}
            >
              <a className="staff-href" onClick={(e) => e.preventDefault()}>
                <Space>
                  <p>Duy Nguyễn</p>
                  <Avatar />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>

        <Content className="layout-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutUser;
