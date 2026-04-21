// components/RouteCard.jsx

import { Button } from "antd";
import { CheckCircleOutlined, PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { ROUTE_INFO } from "../../constants";
import StopList from "./StopList";
import styles from "../../pages/Driver/Dashboard.module.css";

const RouteCard = ({ routeStarted, stopsCompleted, totalStops, onToggleRoute, onMarkStop }) => (
  <div className={styles.routeCard}>
    <div className={styles.routeCardTitle}>
      Today's Route
    </div>

    {[
      ["Vehicle",     ROUTE_INFO.vehicle],
      ["Total Stops", `${totalStops} Stops`],
      ["Total Load",  `${ROUTE_INFO.totalLoad} kg`],
    ].map(([label, value]) => (
      <div key={label} className={styles.routeRow}>
        <span className={styles.routeLabel}>{label}</span>
        <span className={styles.routeValue}>{value}</span>
      </div>
    ))}

    <div className={styles.routeDate}>Route Date: {ROUTE_INFO.date}</div>

    <Button
      type="primary"
      icon={routeStarted ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
      className={styles.startBtn}
      onClick={onToggleRoute}
      style={{
        background: routeStarted
          ? "linear-gradient(90deg,#c62828,#b71c1c)"
          : "linear-gradient(90deg,#00897b,#00695c)",
        borderColor: "transparent",
      }}
    >
      {routeStarted ? "Stop Route" : "Start Route"}
    </Button>

    <Button
      className={styles.outlineBtn}
      icon={<CheckCircleOutlined />}
      onClick={onMarkStop}
      disabled={stopsCompleted >= totalStops}
    >
      Mark Next Stop Done
    </Button>

    <StopList stopsCompleted={stopsCompleted} />
  </div>
);

export default RouteCard;
