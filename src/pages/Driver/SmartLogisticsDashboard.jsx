// SmartLogisticsDashboard.jsx
import { useState } from "react";
import {
  PoweroffOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Progress,
  Tag,
  Badge,
  Tooltip,
  Typography,
  Popconfirm,
  Dropdown,
} from "antd";
import {
  CarOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ThunderboltOutlined,
  PhoneOutlined,
  BellOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  EyeOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import {
  GoogleMap,
  LoadScript,
  Polyline,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import styles from "./Dashboard.module.css";

const { Text } = Typography;

// ─── Data ──────────────────────────────────────────────────────────────────────
const GOOGLE_MAPS_API_KEY = import.meta.env?.VITE_GOOGLE_MAPS_API_KEY || "";

const ROUTE_INFO = {
  vehicle: "MH12AB1234",
  driver: "Rajesh Singh",
  date: "01 April 2026",
  totalLoad: 850,
};

const STOPS = [
  { id: 0, label: "Warehouse", lat: 28.6139, lng: 77.209 },
  { id: 1, label: "Anganwadi Center A", lat: 28.6239, lng: 77.219 },
  { id: 2, label: "Dairy Center B", lat: 28.6319, lng: 77.229 },
  { id: 3, label: "Anganwadi Center C", lat: 28.6389, lng: 77.239 },
  { id: 4, label: "Anganwadi Center D", lat: 28.6289, lng: 77.249 },
];

const NOTIFICATIONS = [
  {
    id: 1,
    icon: "⚙️",
    text: "Vehicle maintenance due soon!",
    cls: "notifWarn",
  },
  {
    id: 2,
    icon: "🚧",
    text: "Traffic advisory: Expect delays on route",
    cls: "notifDanger",
  },
  {
    id: 3,
    icon: "✅",
    text: "Route optimized successfully",
    cls: "notifSuccess",
  },
];

const polylinePath = STOPS.map(({ lat, lng }) => ({ lat, lng }));
const MAP_CENTER = { lat: 28.629, lng: 77.229 };
const MAP_STYLE = { width: "100%", height: "300px" };

const MAP_OPTIONS = {
  styles: [
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#aadaff" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#d0dce8" }],
    },
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#f0f5fb" }],
    },
  ],
};

// ─── MapView Component ─────────────────────────────────────────────────────────
function MapView() {
  const [selected, setSelected] = useState(null);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className={styles.mapMock}>
        <div className={styles.mapMockIcon}>🗺️</div>
        <div>Map Preview — Add VITE_GOOGLE_MAPS_API_KEY to enable</div>
        <div className={styles.mapMockSub}>
          {STOPS.length - 1} stops plotted along route
        </div>
        <svg
          width="88%"
          height="110"
          viewBox="0 0 500 110"
          style={{ marginTop: 6 }}
        >
          <rect width="500" height="110" rx="8" fill="#c8ddf0" />
          <line
            x1="0"
            y1="55"
            x2="500"
            y2="55"
            stroke="#b0c8e0"
            strokeWidth="8"
          />
          <line
            x1="120"
            y1="0"
            x2="120"
            y2="110"
            stroke="#b0c8e0"
            strokeWidth="5"
          />
          <line
            x1="310"
            y1="0"
            x2="310"
            y2="110"
            stroke="#b0c8e0"
            strokeWidth="5"
          />
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
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <div className={styles.mapContainer}>
        <GoogleMap
          mapContainerStyle={MAP_STYLE}
          center={MAP_CENTER}
          zoom={13}
          options={MAP_OPTIONS}
        >
          <Polyline
            path={polylinePath}
            options={{
              strokeColor: "#1565c0",
              strokeWeight: 3.5,
              strokeOpacity: 0.9,
              icons: [
                {
                  icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 4 },
                  offset: "0",
                  repeat: "20px",
                },
              ],
            }}
          />
          {STOPS.map((stop) => (
            <Marker
              key={stop.id}
              position={{ lat: stop.lat, lng: stop.lng }}
              onClick={() => setSelected(stop)}
              label={{
                text: stop.id === 0 ? "W" : String(stop.id),
                color: "#fff",
                fontWeight: "bold",
                fontSize: "12px",
              }}
              icon={{
                path: window.google?.maps?.SymbolPath?.CIRCLE || 0,
                scale: 14,
                fillColor: stop.id === 0 ? "#0f2d52" : "#e53935",
                fillOpacity: 1,
                strokeColor: "#fff",
                strokeWeight: 2,
              }}
            />
          ))}
          {selected && (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#0d2137",
                  padding: "2px 4px",
                }}
              >
                {selected.id === 0 ? "🏭 " : `📍 Stop ${selected.id}: `}
                {selected.label}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────
export default function SmartLogisticsDashboard() {
  const navigate = useNavigate();
  const [routeStarted, setRouteStarted] = useState(false);
  const [stopsCompleted, setStopsCompleted] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("sctoken");
    navigate("/auth/login");
  };

  const totalStops = STOPS.length - 1;
  const loadDelivered = Math.round(
    (stopsCompleted / totalStops) * ROUTE_INFO.totalLoad,
  );
  const stopsPct = Math.round((stopsCompleted / totalStops) * 100);
  const loadPct = Math.round((loadDelivered / ROUTE_INFO.totalLoad) * 100);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  })();

  const markStop = () => setStopsCompleted((v) => Math.min(v + 1, totalStops));
  const userMenu = [
    {
      key: "logout",
      label: (
        <Popconfirm
          title="Are you sure you want to logout?"
          okText="Yes"
          cancelText="No"
          onConfirm={handleLogout}
        >
          <span>Logout</span>
        </Popconfirm>
      ),
    },
  ];
  return (
    <div className={styles.root}>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerLogo}>
          <span className={styles.headerLogoIcon}>🗺️</span>
          Smart Logistics System
        </div>
        <div className={styles.headerRight}>
          <WifiOutlined style={{ color: "#5dade2" }} />
          <span>Welcome, {ROUTE_INFO.driver}</span>
          <Dropdown menu={{ items: userMenu }} placement="bottomRight">
            <div className={styles.avatar} style={{ cursor: "pointer" }}>
              RJ
            </div>
          </Dropdown>
        </div>
      </header>

      {/* ── Main Body ──────────────────────────────────────────────────────── */}
      <main className={styles.body}>
        {/* Greeting */}
        <div className={styles.greeting}>
          {greeting},{" "}
          <span className={styles.greetingAccent}>{ROUTE_INFO.driver}</span>
        </div>
        <div className={styles.greetingSub}>Here is your route for today:</div>

        {/* ── Top Grid ── */}
        <div className={styles.topGrid}>
          {/* Today's Route (dark card) */}
          <div className={styles.routeCard}>
            <div className={styles.routeCardTitle}>
              <CarOutlined /> Today's Route
            </div>

            {[
              ["Vehicle", ROUTE_INFO.vehicle],
              ["Total Stops", `${totalStops} Stops`],
              ["Total Load", `${ROUTE_INFO.totalLoad} kg`],
            ].map(([label, value]) => (
              <div key={label} className={styles.routeRow}>
                <span className={styles.routeLabel}>{label}</span>
                <span className={styles.routeValue}>{value}</span>
              </div>
            ))}

            <div className={styles.routeDate}>
              Route Date: {ROUTE_INFO.date}
            </div>

            {/* Start / Stop Button */}
            <Button
              type="primary"
              icon={
                routeStarted ? <PauseCircleOutlined /> : <PlayCircleOutlined />
              }
              className={styles.startBtn}
              onClick={() => setRouteStarted((v) => !v)}
              style={{
                background: routeStarted
                  ? "linear-gradient(90deg,#c62828,#b71c1c)"
                  : "linear-gradient(90deg,#00897b,#00695c)",
                borderColor: "transparent",
              }}
            >
              {routeStarted ? "Stop Route" : "Start Route"}
            </Button>

            {/* Mark Stop Done */}
            <Button
              className={styles.outlineBtn}
              icon={<CheckCircleOutlined />}
              onClick={markStop}
              disabled={stopsCompleted >= totalStops}
            >
              Mark Next Stop Done
            </Button>

            {/* Stop List */}
            <div className={styles.stopList}>
              {STOPS.map((stop) => {
                const done = stop.id !== 0 && stop.id <= stopsCompleted;
                return (
                  <div
                    key={stop.id}
                    className={`${styles.stopItem} ${done ? styles.done : ""}`}
                  >
                    <div
                      className={`${styles.stopBadge} ${stop.id === 0 ? styles.stopBadgeStart : styles.stopBadgeStop}`}
                    >
                      {stop.id === 0 ? "W" : stop.id}
                    </div>
                    <span
                      className={`${styles.stopLabel} ${done ? styles.done : ""}`}
                    >
                      {stop.id === 0 ? "Start: " : `Stop ${stop.id}: `}
                      {stop.label}
                    </span>
                    {done && (
                      <CheckCircleOutlined
                        style={{
                          color: "#43a047",
                          marginLeft: "auto",
                          fontSize: 13,
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Map Card */}
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
                    style={{
                      background: stop.id === 0 ? "#0f2d52" : "#e53935",
                    }}
                  />
                  <span>
                    {stop.id === 0 ? "Start: " : `Stop ${stop.id}: `}
                    {stop.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── Action Bar ── */}
        <div className={styles.actionBar}>
          <Tooltip title="Begin today's delivery route">
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              className={`${styles.actionBtn} ${styles.btnStart}`}
              onClick={() => setRouteStarted(true)}
            >
              Start Route
            </Button>
          </Tooltip>
          <Tooltip title="View all stops on map">
            <Button
              type="primary"
              icon={<EnvironmentOutlined />}
              className={`${styles.actionBtn} ${styles.btnStops}`}
            >
              View Stops
            </Button>
          </Tooltip>
          <Tooltip title="Mark current stop as delivered">
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              className={`${styles.actionBtn} ${styles.btnDeliver}`}
              onClick={markStop}
              disabled={stopsCompleted >= totalStops}
            >
              Update Delivery
            </Button>
          </Tooltip>
          <Tooltip title="Report a problem on route">
            <Button
              type="primary"
              danger
              icon={<WarningOutlined />}
              className={`${styles.actionBtn} ${styles.btnIssue}`}
            >
              Report Issue
            </Button>
          </Tooltip>
        </div>

        {/* ── Bottom Grid ── */}
        <div className={styles.bottomGrid}>
          {/* Delivery Summary */}
          <Card className={styles.summaryCard} bodyStyle={{ padding: "20px" }}>
            <div className={styles.cardTitle}>
              <ThunderboltOutlined style={{ color: "#1565c0" }} /> Delivery
              Summary
            </div>

            <div className={styles.progressSection}>
              <div className={styles.progressMeta}>
                <span>Stops Completed</span>
                <span
                  className={styles.progressValue}
                  style={{ color: "#1565c0" }}
                >
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
                <span
                  className={styles.progressValue}
                  style={{ color: "#00897b" }}
                >
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

          {/* Notifications */}
          <Card className={styles.summaryCard} bodyStyle={{ padding: "20px" }}>
            <div className={styles.cardTitle}>
              <BellOutlined style={{ color: "#ffc107" }} /> Notifications
              <Badge count={NOTIFICATIONS.length} style={{ marginLeft: 6 }} />
            </div>
            {NOTIFICATIONS.map((n) => (
              <div
                key={n.id}
                className={`${styles.notifItem} ${styles[n.cls]}`}
              >
                <span className={styles.notifIcon}>{n.icon}</span>
                <span>{n.text}</span>
              </div>
            ))}
          </Card>

          {/* Emergency Contact */}
          <Card
            className={styles.emergencyCard}
            bodyStyle={{ padding: "20px" }}
          >
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
        </div>
      </main>
    </div>
  );
}
