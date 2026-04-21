// components/ActionBar.jsx

import { Button, Tooltip } from "antd";
import {
  PlayCircleOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import styles from "../../pages/Driver/Dashboard.module.css";

const ActionBar = ({ stopsCompleted, totalStops, onStartRoute, onMarkStop }) => (
  <div className={styles.actionBar}>
    <Tooltip title="Begin today's delivery route">
      <Button
        type="primary"
        icon={<PlayCircleOutlined />}
        className={`${styles.actionBtn} ${styles.btnStart}`}
        onClick={onStartRoute}
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
        onClick={onMarkStop}
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
);

export default ActionBar;
