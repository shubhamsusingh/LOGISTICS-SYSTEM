// SmartLogisticsDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import getGreeting from "../../utils/getGreeting";
import Header from "../../components/Driver/Header";
import RouteCard from "../../components/Driver/RouteCard";
import MapCard from "../../components/Driver/MapCard";
import ActionBar from "../../components/Driver/ActionBar";
import DeliverySummary from "../../components/Driver/DeliverySummary";
import NotificationsCard from "../../components/Driver/NotificationsCard";
import EmergencyCard from "../../components/Driver/EmergencyCard";
import { driverDashboard } from "../../services/driver";

import styles from "./Dashboard.module.css";

const SmartLogisticsDashboard = () => {
  const navigate = useNavigate();

  // ── API state ──
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Local interaction state ──
  const [routeStarted, setRouteStarted] = useState(false);
  const [stopsCompleted, setStopsCompleted] = useState(0);

  // ── Fetch on mount ──
  // ── Fetch on mount ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await driverDashboard();

        // Your API nests the payload at resp.data.data
        if (resp?.data?.success) {
          setDashboardData(resp.data.data);   // ✅ was: response?.success → response.data
        } else {
          setError("Failed to load dashboard data.");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // ── Derived values from API ──
  const driver = dashboardData?.driver ?? {};
  const vehicle = dashboardData?.vehicle ?? {};
  const summary = dashboardData?.summary ?? {};
  const route = dashboardData?.routes?.[0] ?? {};
  const stops = route.stops ?? [];

  const totalStops = summary.total_stops ?? stops.length;
  const deliveredStops = summary.delivered_stops ?? stopsCompleted;
  const pendingStops = summary.pending_stops ?? (totalStops - deliveredStops);
  const totalLoad = route.total_load ?? vehicle.capacity ?? 0;
  const loadDelivered = totalLoad > 0
    ? Math.round((deliveredStops / totalStops) * totalLoad)
    : 0;
  const stopsPct = totalStops > 0
    ? Math.round((stopsCompleted / totalStops) * 100)
    : 0;
  const loadPct = totalLoad > 0
    ? Math.round((loadDelivered / totalLoad) * 100)
    : 0;

  // ── Handlers ──
  const handleLogout = () => { localStorage.removeItem("sctoken"); navigate("/auth/login"); };
  const handleToggleRoute = () => setRouteStarted((v) => !v);
  const handleStartRoute = () => setRouteStarted(true);
  const handleMarkStop = () => setStopsCompleted((v) => Math.min(v + 1, totalStops));

  // ── Loading / error states ──
  if (loading) {
    return (
      <div className={styles.root}>
        <div className={styles.body} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.root}>
        <div className={styles.body} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "red" }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>

      {/* ── Header ── */}
      <Header
        driver={driver.name}
        onLogout={handleLogout}
      />

      {/* ── Main Body ── */}
      <main className={styles.body}>

        {/* Greeting */}
        <div className={styles.greeting}>
          {getGreeting()},{" "}
          <span className={styles.greetingAccent}>{driver.name}</span>
        </div>
        <div className={styles.greetingSub}>
          Here is your route for today:
          {route.route_date && (
            <span style={{ marginLeft: 8, opacity: 0.6 }}>({route.route_date})</span>
          )}
        </div>

        {/* Vehicle info strip — visible when data is available */}
        {vehicle.vehicle_number && (
          <div className={styles.vehicleInfo} style={{ marginBottom: 8, fontSize: 13, opacity: 0.7 }}>
            Vehicle: <strong>{vehicle.vehicle_number}</strong>
            &nbsp;·&nbsp;Capacity: <strong>{vehicle.capacity} units</strong>
            &nbsp;·&nbsp;Distance: <strong>{route.total_distance} km</strong>
          </div>
        )}

        {/* Top Grid — Route Card + Map */}
        <div className={styles.topGrid}>
          <RouteCard
            routeStarted={routeStarted}
            stopsCompleted={stopsCompleted}
            totalStops={totalStops}
            stops={stops}
            routeId={route.route_id}
            totalLoad={totalLoad}
            vehicle={vehicle}              // ← add this
            routeDate={route.route_date}   // ← add this
            onToggleRoute={handleToggleRoute}
            onMarkStop={handleMarkStop}
          />
          <MapCard
            stops={stops}                     // pass stops for map pins
            routeId={route.route_id}
          />
        </div>

        {/* Action Bar */}
        <ActionBar
          stopsCompleted={stopsCompleted}
          totalStops={totalStops}
          pendingStops={pendingStops}
          onStartRoute={handleStartRoute}
          onMarkStop={handleMarkStop}
        />

        {/* Bottom Grid — Summary + Notifications + Emergency */}
        <div className={styles.bottomGrid}>
          <DeliverySummary
            stopsCompleted={stopsCompleted}
            totalStops={totalStops}
            loadDelivered={loadDelivered}
            stopsPct={stopsPct}
            loadPct={loadPct}
            totalLoad={totalLoad}
            pendingStops={pendingStops}
          />
          <NotificationsCard />
          <EmergencyCard />
        </div>

      </main>
    </div>
  );
};

export default SmartLogisticsDashboard;