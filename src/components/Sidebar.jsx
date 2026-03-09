import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">SmartLogix</h2>

      <nav>

        <Link to="/admin/dashboard">Admin Dashboard</Link>

        <Link to="/driver/dashboard">Driver Dashboard</Link>

        <Link to="/">Home</Link>

      </nav>

    </div>
  );
}

export default Sidebar;