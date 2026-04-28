// components/StopList.jsx

import { CheckCircleOutlined } from "@ant-design/icons";
import styles from "../../pages/Driver/Dashboard.module.css";

const StopList = ({ stops = [], stopsCompleted }) => (
  <div className={styles.stopList}>

    {/* Warehouse / Start — always first, static */}
    <div className={`${styles.stopItem}`}>
      <div className={`${styles.stopBadge} ${styles.stopBadgeStart}`}>W</div>
      <span className={styles.stopLabel}>Start: Warehouse</span>
    </div>

    {/* API stops */}
    {stops.map((stop) => {
      const done = stop.stop_order <= stopsCompleted;

      return (
        <div
          key={stop.stop_id}
          className={`${styles.stopItem} ${done ? styles.done : ""}`}
        >
          <div className={`${styles.stopBadge} ${styles.stopBadgeStop}`}>
            {stop.stop_order}
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <span className={`${styles.stopLabel} ${done ? styles.done : ""}`}>
              Stop {stop.stop_order}: {stop.center_name}
            </span>
            {/* <span style={{ fontSize: 11, opacity: 0.6 }}>
              {stop.address}
            </span> */}
          </div>

          {done && (
            <CheckCircleOutlined
              style={{ color: "#43a047", marginLeft: "auto", fontSize: 13 }}
            />
          )}
        </div>
      );
    })}

  </div>
);

export default StopList;