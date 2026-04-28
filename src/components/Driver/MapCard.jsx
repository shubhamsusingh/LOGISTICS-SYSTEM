import { Card } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import MapView from "./MapView";
import styles from "../../pages/Driver/Dashboard.module.css";

const MapCard = ({ stops = [] }) => (
  <Card className={styles.mapCard} bodyStyle={{ padding: "20px" }}>
    <div className={styles.mapCardTitle}>
      <EnvironmentOutlined style={{ color: "#1565c0" }} />
      Optimized Route Map
    </div>

    <MapView stops={stops} />

    <div className={styles.routeLegend}>
      {/* Warehouse always first in legend */}
      <div className={styles.legendItem}>
        <div className={styles.legendDot} style={{ background: "#0f2d52" }} />
        <span>Start: Warehouse</span>
      </div>

      {[...stops]
        .sort((a, b) => a.stop_order - b.stop_order)
        .slice(0, 3)
        .map((stop) => (
          <div key={stop.stop_id} className={styles.legendItem}>
            <div className={styles.legendDot} style={{ background: "#e53935" }} />
            <span>Stop {stop.stop_order}: {stop.center_name}</span>
          </div>
        ))}
    </div>
  </Card>
);

export default MapCard;