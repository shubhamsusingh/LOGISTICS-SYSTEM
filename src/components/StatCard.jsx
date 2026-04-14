import { Card } from "antd";

const StatCard = ({ icon, title, value }) => {
  return (
    <Card
      hoverable
      style={{
        borderRadius: "12px",
        background: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        border: "1px solid #f1f5f9",
      }}
      bodyStyle={{ padding: "16px 18px" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        
        {/* ICON */}
        <div style={{ fontSize: "26px", color: "#6366f1" }}>
          {icon}
        </div>

        {/* TEXT */}
        <div>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#6b7280",
            }}
          >
            {title}
          </p>

          <h3
            style={{
              margin: "4px 0 0",
              fontSize: "20px",
              fontWeight: "600",
              color: "#111827",
            }}
          >
            {value || 0}
          </h3>
        </div>

      </div>
    </Card>
  );
};

export default StatCard;