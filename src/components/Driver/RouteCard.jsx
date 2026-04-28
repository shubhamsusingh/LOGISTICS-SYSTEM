// components/RouteCard.jsx

import { Button } from "antd";
import { CheckCircleOutlined, PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import StopList from "./StopList";
import styles from "../../pages/Driver/Dashboard.module.css";

const RouteCard = ({
  routeStarted,
  stopsCompleted,
  totalStops,
  stops,          // ← array of stop objects from API
  routeId,        // ← route_id from API
  totalLoad,      // ← total_load from API
  vehicle,        // ← vehicle object from API  { vehicle_number, capacity }
  routeDate,      // ← route_date from API
  onToggleRoute,
  onMarkStop,
}) => (
  <div className={styles.routeCard}>
    <div className={styles.routeCardTitle}>Today's Route</div>

    {[
      ["Vehicle",     vehicle?.vehicle_number ?? "—"],
      ["Total Stops", `${totalStops ?? 0} Stops`],
      ["Total Load",  `${totalLoad ?? 0} kg`],
    ].map(([label, value]) => (
      <div key={label} className={styles.routeRow}>
        <span className={styles.routeLabel}>{label}</span>
        <span className={styles.routeValue}>{value}</span>
      </div>
    ))}

    <div className={styles.routeDate}>
      Route Date: {routeDate ?? "—"}
    </div>

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

    {/* Pass API stops down to StopList */}
    <StopList stops={stops} stopsCompleted={stopsCompleted} />
  </div>
);

export default RouteCard;