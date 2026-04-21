// components/DeliverySummary.jsx

import { Card, Progress } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";
import { ROUTE_INFO } from "../../constants";
import styles from "../../pages/Driver/Dashboard.module.css";

const DeliverySummary = ({ stopsCompleted, totalStops, loadDelivered, stopsPct, loadPct }) => (
  <Card className={styles.summaryCard} bodyStyle={{ padding: "20px" }}>
    <div className={styles.cardTitle}>
      <ThunderboltOutlined style={{ color: "#1565c0" }} /> Delivery Summary
    </div>

    <div className={styles.progressSection}>
      <div className={styles.progressMeta}>
        <span>Stops Completed</span>
        <span className={styles.progressValue} style={{ color: "#1565c0" }}>
          {stopsCompleted} / {totalStops}
        </span>
      </div>
      <Progress
        percent={stopsPct}
        showInfo={false}
        strokeColor={{ from: "#1565c0", to: "#42a5f5" }}
        trailColor="#e8edf3"
        strokeWidth={8}
      />
    </div>

    <div className={styles.progressSection}>
      <div className={styles.progressMeta}>
        <span>Load Delivered</span>
        <span className={styles.progressValue} style={{ color: "#00897b" }}>
          {loadDelivered} / {ROUTE_INFO.totalLoad} kg
        </span>
      </div>
      <Progress
        percent={loadPct}
        showInfo={false}
        strokeColor={{ from: "#00897b", to: "#4db6ac" }}
        trailColor="#e8edf3"
        strokeWidth={8}
      />
    </div>

    <div className={styles.networkBadge}>
      <div className={styles.pulseDot} /> 4G Connected
    </div>
  </Card>
);

export default DeliverySummary;
