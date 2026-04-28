import styles from "../../pages/Driver/Dashboard.module.css";

const WAREHOUSE_POINT = { x: 35, y: 55, label: "W", isWarehouse: true, name: "Warehouse" };

const MapMockView = ({ stops = [] }) => {
  const sortedStops = [...stops].sort((a, b) => a.stop_order - b.stop_order);

  const stopPoints = sortedStops.map((stop, i) => ({
    x:           100 + i * (370 / Math.max(sortedStops.length, 1)),
    y:           [50, 40, 45, 35, 55][i % 5],
    label:       String(stop.stop_order),
    name:        stop.center_name,
    isWarehouse: false,
  }));

  const points = [WAREHOUSE_POINT, ...stopPoints];
  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className={styles.mapMock}>
      <div className={styles.mapMockIcon}>🗺️</div>
      <div>Map Preview — Add VITE_GOOGLE_MAPS_API_KEY to enable</div>
      <div className={styles.mapMockSub}>
        {stops.length} stops plotted · Route starts from Warehouse
      </div>

      <svg width="88%" height="110" viewBox="0 0 500 110" style={{ marginTop: 6 }}>
        <rect width="500" height="110" rx="8" fill="#c8ddf0" />
        <line x1="0"   y1="55" x2="500" y2="55"  stroke="#b0c8e0" strokeWidth="8" />
        <line x1="120" y1="0"  x2="120" y2="110" stroke="#b0c8e0" strokeWidth="5" />
        <line x1="310" y1="0"  x2="310" y2="110" stroke="#b0c8e0" strokeWidth="5" />

        <polyline
          points={polylinePoints}
          fill="none"
          stroke="#1565c0"
          strokeWidth="3"
          strokeDasharray="7,3"
        />

        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={p.isWarehouse ? 12 : 9}
              fill={p.isWarehouse ? "#0f2d52" : "#e53935"}
              stroke="#fff"
              strokeWidth="2"
            />
            <text
              x={p.x}
              y={p.y + 1}
              textAnchor="middle"
              fill="#fff"
              fontSize="9"
              fontWeight="bold"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default MapMockView;