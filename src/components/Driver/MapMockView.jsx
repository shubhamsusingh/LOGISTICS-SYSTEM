// components/MapMockView.jsx

import { STOPS } from "../../constants";
import styles from "../../pages/Driver/Dashboard.module.css";

const MapMockView = () => (
  <div className={styles.mapMock}>
    <div className={styles.mapMockIcon}>🗺️</div>
    <div>Map Preview — Add VITE_GOOGLE_MAPS_API_KEY to enable</div>
    <div className={styles.mapMockSub}>
      {STOPS.length - 1} stops plotted along route
    </div>
    <svg width="88%" height="110" viewBox="0 0 500 110" style={{ marginTop: 6 }}>
      <rect width="500" height="110" rx="8" fill="#c8ddf0" />
      <line x1="0"   y1="55" x2="500" y2="55"  stroke="#b0c8e0" strokeWidth="8" />
      <line x1="120" y1="0"  x2="120" y2="110" stroke="#b0c8e0" strokeWidth="5" />
      <line x1="310" y1="0"  x2="310" y2="110" stroke="#b0c8e0" strokeWidth="5" />
      <polyline
        points="35,75 130,50 230,40 330,45 445,35"
        fill="none"
        stroke="#1565c0"
        strokeWidth="3"
        strokeDasharray="7,3"
      />
      {[35, 130, 230, 330, 445].map((x, i) => {
        const ys = [75, 50, 40, 45, 35];
        return (
          <g key={i}>
            <circle
              cx={x}
              cy={ys[i]}
              r={i === 0 ? 11 : 9}
              fill={i === 0 ? "#0f2d52" : "#e53935"}
              stroke="#fff"
              strokeWidth="2"
            />
            <text
              x={x}
              y={ys[i] + 1}
              textAnchor="middle"
              fill="#fff"
              fontSize="9"
              fontWeight="bold"
            >
              {i === 0 ? "W" : i}
            </text>
          </g>
        );
      })}
    </svg>
  </div>
);

export default MapMockView;
