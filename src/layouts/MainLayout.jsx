import { Layout, Menu, Avatar ,Dropdown} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const menuItems = [
  { key: "/", label: "Dashboard" },
  { key: "/vehicles", label: "Vehicles" },
  { key: "/delivery", label: "Delivery Points" },
  { key: "/route", label: "Route Optimization" },
  { key: "/reports", label: "Reports" },
];

export default function MainLayout() {
  const [selectedMenu, setSelectedMenu] = useState("/");
  const navigate = useNavigate();
const userMenu = [
    {
      key: "logout",
      label: "Logout",
      onClick: () => {
        localStorage.removeItem("sctoken"); // remove auth
        navigate("/auth/login"); // redirect
      },
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{ display: "flex", alignItems: "center", background: "#1a2b4a" }}
      >
        {/* Logo */}
        <div style={{ color: "white", fontWeight: "bold", marginRight: 20 }}>
          Smart Logistics
        </div>

        {/* Menu */}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => {
            setSelectedMenu(key);
            navigate(key);
          }}
          items={menuItems}
          style={{ flex: 1 }}
        />

        {/* User */}
       <Dropdown menu={{ items: userMenu }} placement="bottomRight">
          <Avatar
            icon={<UserOutlined />}
            style={{ cursor: "pointer", marginLeft: 10 }}
          />
        </Dropdown>
      </Header>

      {/* Pages Render Here */}
      <Content style={{ padding: "20px", background: "#f0f4f8" }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
