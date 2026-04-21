// components/EmergencyCard.jsx

import { Card } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { ROUTE_INFO } from "../../constants";
import styles from "../../pages/Driver/Dashboard.module.css";

const EmergencyCard = () => (
  <Card className={styles.emergencyCard} bodyStyle={{ padding: "20px" }}>
    <div className={styles.cardTitle} style={{ color: "#6d4c00" }}>
      🚨 Emergency Contact
    </div>
    <div className={styles.emergencyLabel}>Transport Manager:</div>
    <div className={styles.emergencyName}>Mr. Amit Sharma</div>
    <a href="tel:+919876543210" className={styles.callBtn}>
      <PhoneOutlined /> +91 9876543210
    </a>
    <div className={styles.emergencyMeta}>
      <strong>Vehicle:</strong> {ROUTE_INFO.vehicle}
      <br />
      <strong>Driver:</strong> {ROUTE_INFO.driver}
    </div>
  </Card>
);

export default EmergencyCard;
