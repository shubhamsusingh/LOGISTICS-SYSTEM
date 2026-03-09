import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DriverDashboard from "./pages/driver/DriverDashboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/driver/dashboard" element={<DriverDashboard />} />

        <Route path="/" element={<Home />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;