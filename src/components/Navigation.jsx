import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/auth/Login";
import VehicleManagement from "../pages/vechileManagement";
import Dashboard from "../pages/Dashboard";
import DeliveryPoints from "../pages/deliveryPoints";
import DeliveryDemand from "../pages/DeliveryDemand";
import SmartLogisticsDashboard from "../pages/Driver/SmartLogisticsDashboard";

const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("sctoken");

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("sctoken");
  const role = Number(localStorage.getItem("role"));

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  // If role is not allowed → block
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={role === 2 ? "/driver" : "/"} replace />;
  }

  return <Outlet />;
};
const Navigation = () => {
  return (
    <Routes>

      {/* ADMIN ROUTES */}
      <Route element={<PrivateRoute allowedRoles={[1]} />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/aboute" element={<About />} />
          <Route path="/vehicles" element={<VehicleManagement />} />
          <Route path="/delivery" element={<DeliveryPoints />} />
          <Route path="demand" element={<DeliveryDemand />} />
        </Route>
      </Route>

      {/* DRIVER ROUTES */}
      <Route element={<PrivateRoute allowedRoles={[2]} />}>
        <Route path="/driver" element={<SmartLogisticsDashboard />} />
      </Route>

      {/* PUBLIC ROUTES */}
      <Route element={<PublicRoute />}>
        <Route path="/auth/login" element={<Login />} />
      </Route>

    </Routes>
  );
};
export default Navigation;
