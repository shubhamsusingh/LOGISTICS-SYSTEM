// pages/Dashboard.jsx
import { Row, Col } from "antd";
import { CarOutlined, EnvironmentOutlined ,FlagFilled,FileFilled } from "@ant-design/icons";

import StatCard from "../components/StatCard";
import FuelCard from "../components/FuelCard";
import DeliveryChart from "../components/DeliveryChart";
import GaugeChart from "../components/GaugeChart";
import MapView from "../components/MapView";

const Dashboard = () => {
  return (
    <div style={{ padding: 20 }}>
      {/* Top Stats */}
      <Row gutter={16}>
        <Col span={6}>
          <StatCard icon={<CarOutlined />} title="Total Vehicles" value="24" />
        </Col>
        <Col span={6}>
          <StatCard icon={<EnvironmentOutlined />} title="Delivery Points" value="68" />
        </Col>
        <Col span={6}>
          <StatCard icon={<FlagFilled />}title="Active Routes" value="15" />
        </Col>
        <Col span={6}>
          <StatCard icon={<FileFilled />} title="Today's Deliveries" value="128 / 142" />
        </Col>
      </Row>

      {/* Middle Section */}
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <FuelCard />
        </Col>
        <Col span={12}>
          <MapView />
        </Col>
      </Row>

      {/* Bottom Section */}
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <DeliveryChart />
        </Col>
        <Col span={6}>
          <GaugeChart title="Fuel Usage" value={70} />
        </Col>
        <Col span={6}>
          <GaugeChart title="Cost Savings" value={22} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;