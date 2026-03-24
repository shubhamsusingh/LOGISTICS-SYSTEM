// components/StatCard.jsx
import { Card } from "antd";

const StatCard = ({ icon, title, value }) => {
  return (
    <Card style={{ borderRadius: 10 ,background: "#cad9e9"}}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontSize: 28 }}>{icon}</div>
        <div>
          <h4>{title}</h4>
          <h2>{value}</h2>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;