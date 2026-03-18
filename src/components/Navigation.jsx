import { Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import About from "../pages/About"
import Home from "../pages/Home"

const Navigation=()=>{
    return(
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<Home/>}></Route>
                <Route path="/aboute" element={<About/>}/>
                
            </Route>
        </Routes>
    )
};
export default Navigation;