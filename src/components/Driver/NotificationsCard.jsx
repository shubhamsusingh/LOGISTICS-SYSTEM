import { useState, useEffect } from "react";
import { Card, Badge } from "antd";
import { BellOutlined, ClockCircleOutlined, WarningOutlined, CheckCircleOutlined } from "@ant-design/icons";
import styles from "../../pages/Driver/Dashboard.module.css";

const NotificationsCard = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "info",
      icon: <ClockCircleOutlined style={{ color: "#1565c0" }} />,
      message: "Next stop ETA: 12 minutes",
      time: "2 min ago",
      unread: true
    },
    {
      id: 2,
      type: "success",
      icon: <CheckCircleOutlined style={{ color: "#4caf50" }} />,
      message: "Route optimized - 15 min saved",
      time: "5 min ago",
      unread: true
    },
    {
      id: 3,
      type: "warning",
      icon: <WarningOutlined style={{ color: "#ff9800" }} />,
      message: "Heavy traffic on MG Road",
      time: "10 min ago",
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <Card
      title={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>
            <BellOutlined /> Live Updates
          </span>
          <Badge count={unreadCount} style={{ background: "#1565c0" }} />
        </div>
      }
      bodyStyle={{ padding: "12px" }}
      style={{ borderRadius: 12 }}
      extra={
        unreadCount > 0 && (
          <span
            onClick={markAllRead}
            style={{
              fontSize: 11,
              color: "#1565c0",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Mark all read
          </span>
        )
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {notifications.map((notif) => (
          <div
            key={notif.id}
            style={{
              display: "flex",
              gap: 12,
              padding: 10,
              background: notif.unread ? "#e3f2fd" : "#f8f9fa",
              borderRadius: 8,
              borderLeft: notif.unread ? "3px solid #1565c0" : "3px solid transparent",
              transition: "all 0.2s"
            }}
          >
            <div style={{ fontSize: 18 }}>{notif.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 12,
                color: "#0d2137",
                fontWeight: notif.unread ? 600 : 400
              }}>
                {notif.message}
              </div>
              <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>
                {notif.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NotificationsCard;