// components/NotificationsCard.jsx

import { Card, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { NOTIFICATIONS } from "../../constants";
import styles from "../../pages/Driver/Dashboard.module.css";

const NotificationsCard = () => (
  <Card className={styles.summaryCard} bodyStyle={{ padding: "20px" }}>
    <div className={styles.cardTitle}>
      <BellOutlined style={{ color: "#ffc107" }} /> Notifications
      <Badge count={NOTIFICATIONS.length} style={{ marginLeft: 6 }} />
    </div>
    {NOTIFICATIONS.map((n) => (
      <div key={n.id} className={`${styles.notifItem} ${styles[n.cls]}`}>
        <span className={styles.notifIcon}>{n.icon}</span>
        <span>{n.text}</span>
      </div>
    ))}
  </Card>
);

export default NotificationsCard;
