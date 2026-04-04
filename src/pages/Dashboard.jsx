// pages/Dashboard.jsx
import { Row, Col,Card } from "antd";
import { CarOutlined, EnvironmentOutlined ,FlagFilled,FileFilled,ClockCircleOutlined,DashboardOutlined,DollarOutlined ,ApartmentOutlined,InboxOutlined} from "@ant-design/icons";

import StatCard from "../components/StatCard";
import DeliveryChart from "../components/DeliveryChart";
import GaugeChart from "../components/GaugeChart";
import MapView from "../components/MapView";
import { getDashboard } from "../services/Dashboard";
import { useEffect, useState } from "react";
import { use } from "react";

const Dashboard = () => {
  const [data,setData]=useState([]);
  const fetchData=async()=>{
    try {
          const resp = await getDashboard();
          setData(resp.data.data);
          console.log(resp);
        } catch (error) {
          console.error("Error fetching DashboardData:", error);
        }
  }
  useEffect(()=>{
    const getData = async () => {
      await fetchData();
    };

    getData();
  },[]);
  return (
    <div style={{ padding: 20 }}>
      {/* Top Stats */}
      <Row gutter={16}>
        <Col span={6}>
          <StatCard icon={<CarOutlined style={{ fontSize: 50, color: "#1890ff" }} />} title="Total Vehicles" value={data.total_vehicles}/>
        </Col>
        <Col span={6}>
          <StatCard icon={ <EnvironmentOutlined style={{ fontSize: 50, color: "red" }} />} title="Delivery Points" value={data.delivery_points} />
        </Col>
        <Col span={6}>
          <StatCard icon={<ApartmentOutlined style={{ fontSize: 50, color: "green" }} />}title="Active Routes" value="15" />
        </Col>
        <Col span={6}>
          <StatCard icon={<InboxOutlined style={{ fontSize: 50, color: "#faad14" }} />} title="Today's Deliveries"  value={`${data?.today_deliveries?.completed || 0} / ${data?.today_deliveries?.total || 0}`}/>
        </Col>
      </Row>

      {/* Middle Section */}
       <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        {/* LEFT SIDE */}
        <Col xs={24} md={12}>
          <Card
            style={{ marginBottom: "20px" }}
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <DollarOutlined
                  style={{ color: "#1890ff", fontSize: "26px" }}
                />
                <span>Fuel Cost Estimate</span>
              </div>
            }
          >
            <h1 style={{ margin: 0 }}>₹ 18,750 / Day</h1>
            <span style={{ color: "#888" }}>Estimated Daily Fuel Cost</span>
          </Card>

          <Card title="System Overview" style={{ minHeight: "190px" }}>
            <Row justify="space-between">
              <Col
                span={8}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <CarOutlined style={{ fontSize: "26px", color: "#1890ff" }} />
                <div>
                  <h3 style={{ margin: 0 }}>475 km</h3>
                  <span style={{ color: "#888" }}>Distance Covered</span>
                </div>
              </Col>

              <Col
                span={8}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <DashboardOutlined
                  style={{ fontSize: "26px", color: "#52c41a" }}
                />
                <div>
                  <h3 style={{ margin: 0 }}>82%</h3>
                  <span style={{ color: "#888" }}>Load Utilization</span>
                </div>
              </Col>

              <Col
                span={8}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <ClockCircleOutlined
                  style={{ fontSize: "26px", color: "#1890ff" }}
                />
                <div>
                  <h3 style={{ margin: 0 }}>94%</h3>
                  <span style={{ color: "#888" }}>On-Time</span>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* RIGHT SIDE MAP */}
        <Col xs={24} md={12}>
          <Card title="User Route Map">
            <div style={{ height: "280px" }}>
              {" "}
              <MapView data={data} />
            </div>
          </Card>
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