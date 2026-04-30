import { Card } from "antd";
import { TrophyOutlined, ThunderboltOutlined, StarOutlined } from "@ant-design/icons";
import styles from "../../pages/Driver/Dashboard.module.css";

const PerformanceMetrics = () => {
  const metrics = [
    {
      icon: <TrophyOutlined style={{ fontSize: 24, color: "#ffd700" }} />,
      label: "On-Time Rate",
      value: "94%",
      trend: "+2%",
      trendUp: true
    },
    {
      icon: <ThunderboltOutlined style={{ fontSize: 24, color: "#ff6b6b" }} />,
      label: "Avg Speed",
      value: "42 km/h",
      trend: "+5%",
      trendUp: true
    },
    {
      icon: <StarOutlined style={{ fontSize: 24, color: "#4ecdc4" }} />,
      label: "Rating",
      value: "4.8",
      trend: "+0.2",
      trendUp: true
    }
  ];

  return (
    <Card
      title={<span style={{ fontSize: 14, fontWeight: 600 }}>📊 Performance Metrics</span>}
      bodyStyle={{ padding: "16px" }}
      style={{ borderRadius: 12 }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 12,
              background: "#f8f9fa",
              borderRadius: 8
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {metric.icon}
              <div>
                <div style={{ fontSize: 11, color: "#666" }}>{metric.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#0d2137" }}>
                  {metric.value}
                </div>
              </div>
            </div>
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              color: metric.trendUp ? "#4caf50" : "#f44336"
            }}>
              {metric.trendUp ? "↗" : "↘"} {metric.trend}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PerformanceMetrics;