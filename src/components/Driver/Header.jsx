// components/Header.jsx

import { Dropdown, Popconfirm } from "antd";
import { WifiOutlined } from "@ant-design/icons";
import { ROUTE_INFO } from "../../constants";
import styles from "../../pages/Driver/Dashboard.module.css";

const Header = ({ driver, onLogout }) => {
  const userMenu = [
    {
      key: "logout",
      label: (
        <Popconfirm
          title="Are you sure you want to logout?"
          okText="Yes"
          cancelText="No"
          onConfirm={onLogout}
        >
          <span>Logout</span>
        </Popconfirm>
      ),
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <span className={styles.headerLogoIcon}>🗺️</span>
        Smart Logistics System
      </div>
      <div className={styles.headerRight}>
        <WifiOutlined style={{ color: "#5dade2" }} />
        <span>Welcome, {driver}</span>
        <Dropdown menu={{ items: userMenu }} placement="bottomRight">
          <div className={styles.avatar} style={{ cursor: "pointer" }}>
            RJ
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
