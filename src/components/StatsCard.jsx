import "../styles/dashboard.css";

function StatsCard({ title, value, icon }) {
  return (
    <div className="card">
      {icon}
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default StatsCard;