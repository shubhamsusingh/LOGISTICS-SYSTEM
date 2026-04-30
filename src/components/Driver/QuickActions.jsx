import { Card } from "antd";
import {
  PhoneOutlined,
  MessageOutlined,
  CameraOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  ToolOutlined
} from "@ant-design/icons";

const QuickActions = () => {
  const actions = [
    { icon: <PhoneOutlined />, label: "Call Support", color: "#4caf50" },
    { icon: <MessageOutlined />, label: "Message", color: "#2196f3" },
    { icon: <CameraOutlined />, label: "Upload POD", color: "#ff9800" },
    { icon: <EnvironmentOutlined />, label: "Navigate", color: "#9c27b0" },
    { icon: <FileTextOutlined />, label: "Report", color: "#f44336" },
    { icon: <ToolOutlined />, label: "Issue", color: "#607d8b" }
  ];

  return (
    <Card
      title={<span style={{ fontSize: 14, fontWeight: 600 }}>⚡ Quick Actions</span>}
      bodyStyle={{ padding: "16px" }}
      style={{ borderRadius: 12 }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12
      }}>
        {actions.map((action, idx) => (
          <button
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              padding: "12px 8px",
              border: "none",
              background: "#f8f9fa",
              borderRadius: 8,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = action.color;
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f8f9fa";
              e.currentTarget.style.color = "#0d2137";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span style={{ fontSize: 20 }}>{action.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 600 }}>{action.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;