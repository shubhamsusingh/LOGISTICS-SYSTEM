// SmartLogisticsDashboard.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTE_INFO, STOPS } from "../../constants";
import getGreeting from "../../utils/getGreeting";
import Header            from "../../components/Driver/Header";
import RouteCard         from "../../components/Driver/RouteCard";
import MapCard           from "../../components/Driver/MapCard";
import ActionBar         from "../../components/Driver/ActionBar";
import DeliverySummary   from "../../components/Driver/DeliverySummary";
import NotificationsCard from "../../components/Driver/NotificationsCard";
import EmergencyCard     from "../../components/Driver/EmergencyCard";

import styles from "./Dashboard.module.css";

const SmartLogisticsDashboard = () => {
  const navigate = useNavigate();
  const [routeStarted,   setRouteStarted]   = useState(false);
  const [stopsCompleted, setStopsCompleted] = useState(0);

  const totalStops    = STOPS.length - 1;
  const loadDelivered = Math.round((stopsCompleted / totalStops) * ROUTE_INFO.totalLoad);
  const stopsPct      = Math.round((stopsCompleted / totalStops) * 100);
  const loadPct       = Math.round((loadDelivered  / ROUTE_INFO.totalLoad) * 100);

  const handleLogout      = () => { localStorage.removeItem("sctoken"); navigate("/auth/login"); };
  const handleToggleRoute = () => setRouteStarted((v) => !v);
  const handleStartRoute  = () => setRouteStarted(true);
  const handleMarkStop    = () => setStopsCompleted((v) => Math.min(v + 1, totalStops));

  return (
    <div className={styles.root}>

      {/* ── Header ── */}
      <Header driver={ROUTE_INFO.driver} onLogout={handleLogout} />

      {/* ── Main Body ── */}
      <main className={styles.body}>

        {/* Greeting */}
        <div className={styles.greeting}>
          {getGreeting()},{" "}
          <span className={styles.greetingAccent}>{ROUTE_INFO.driver}</span>
        </div>
        <div className={styles.greetingSub}>Here is your route for today:</div>

        {/* Top Grid — Route Card + Map */}
        <div className={styles.topGrid}>
          <RouteCard
            routeStarted={routeStarted}
            stopsCompleted={stopsCompleted}
            totalStops={totalStops}
            onToggleRoute={handleToggleRoute}
            onMarkStop={handleMarkStop}
          />
          <MapCard />
        </div>

        {/* Action Bar */}
        <ActionBar
          stopsCompleted={stopsCompleted}
          totalStops={totalStops}
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
          />
          <NotificationsCard />
          <EmergencyCard />
        </div>

      </main>
    </div>
  );
};

export default SmartLogisticsDashboard;
