// components/MapCard.jsx

import { Card } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { STOPS } from "../../constants";
import MapView from "./MapView";
import styles from "../../pages/Driver/Dashboard.module.css";

const MapCard = () => (
  <Card className={styles.mapCard} bodyStyle={{ padding: "20px" }}>
    <div className={styles.mapCardTitle}>
      <EnvironmentOutlined style={{ color: "#1565c0" }} />
      Optimized Route Map
    </div>

    <MapView />

    <div className={styles.routeLegend}>
      {STOPS.slice(0, 4).map((stop) => (
        <div key={stop.id} className={styles.legendItem}>
          <div
            className={styles.legendDot}
            style={{ background: stop.id === 0 ? "#0f2d52" : "#e53935" }}
          />
          <span>
            {stop.id === 0 ? "Start: " : `Stop ${stop.id}: `}
            {stop.label}
          </span>
        </div>
      ))}
    </div>
  </Card>
);

export default MapCard;
