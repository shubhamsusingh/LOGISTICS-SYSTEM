import { Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import About from "../pages/About"
import Home from "../pages/Home"
import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/auth/Login";
import VehicleManagement from "../pages/vechileManagement";


const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("sctoken");

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("sctoken");

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

const Navigation=()=>{
    return(
        <Routes>
            <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<Home/>}></Route>
                <Route path="/aboute" element={<About/>}/>
                <Route path="/vehicles" element={<VehicleManagement/>}/>
                
            </Route>
            </Route>
            <Route element={<PublicRoute />}>
        {/* <Route path="/auth" element={<AuthLayout />}> */}
          <Route path="/auth/login" element={<Login/>} />
        {/* </Route> */}
      </Route>
        </Routes>
    )
};
export default Navigation;
