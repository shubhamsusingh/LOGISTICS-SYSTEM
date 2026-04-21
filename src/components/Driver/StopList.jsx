// components/StopList.jsx

import { CheckCircleOutlined } from "@ant-design/icons";
import { STOPS } from "../../constants";
import styles from "../../pages/Driver/Dashboard.module.css";

const StopList = ({ stopsCompleted }) => (
  <div className={styles.stopList}>
    {STOPS.map((stop) => {
      const done = stop.id !== 0 && stop.id <= stopsCompleted;
      return (
        <div
          key={stop.id}
          className={`${styles.stopItem} ${done ? styles.done : ""}`}
        >
          <div
            className={`${styles.stopBadge} ${
              stop.id === 0 ? styles.stopBadgeStart : styles.stopBadgeStop
            }`}
          >
            {stop.id === 0 ? "W" : stop.id}
          </div>
          <span className={`${styles.stopLabel} ${done ? styles.done : ""}`}>
            {stop.id === 0 ? "Start: " : `Stop ${stop.id}: `}
            {stop.label}
          </span>
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
