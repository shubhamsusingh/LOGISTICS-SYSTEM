import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home";
import VehicleManagement from "../pages/vechileManagement";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<h1>HELLO</h1>} />
        {/* <Route index element={<Home />}></Route> */}
        <Route path="/aboute" element={<About />} />

        <Route path="vehicles" element={<VehicleManagement />}></Route>
      </Route>
    </Routes>
  );
};
export default Navigation;
