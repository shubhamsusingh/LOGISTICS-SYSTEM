import "../styles/dashboard.css";

function Navbar() {
  return (
    <div className="navbar">

      <div className="logo">
        🚚 Smart Logistics Management System
      </div>

      <div className="nav-links">
        <span>Dashboard</span>
        <span>Vehicles</span>
        <span>Delivery Points</span>
        <span>Route Optimization</span>
        <span>Reports</span>
      </div>

      <div className="profile">
        👤
      </div>

    </div>
  );
}

export default Navbar;