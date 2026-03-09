import Navbar from "../../components/Navbar";
import StatsCard from "../../components/StatsCard";
import "../../styles/dashboard.css";

import { FaTruck, FaMapMarkerAlt, FaRoute, FaBox } from "react-icons/fa";

function AdminDashboard() {
  return (
    <div className="dashboard">

      <Navbar />

      {/* Top Stats Section */}

      <div className="stats">

        <StatsCard
          title="Total Vehicles"
          value="24"
          icon={<FaTruck />}
        />

        <StatsCard
          title="Delivery Points"
          value="68"
          icon={<FaMapMarkerAlt />}
        />

        <StatsCard
          title="Active Routes"
          value="15"
          icon={<FaRoute />}
        />

        <StatsCard
          title="Today's Deliveries"
          value="128 / 142"
          icon={<FaBox />}
        />

      </div>

    </div>
  );
}

export default AdminDashboard;