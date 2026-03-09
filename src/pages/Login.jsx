import { useState } from "react";
import "../styles/login.css";
import bgImage from "../assets/log.jpg";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if(!email || !password){
      setError("All fields are required");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/;

    if(!emailPattern.test(email)){
      setError("Enter a valid email (example@gmail.com)");
      return;
    }

    // const users = [
    //   {email:"admin@gmail.com", password:"1234", role:"admin"},
    //   {email:"driver@gmail.com", password:"1234", role:"driver"}
    // ];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if(!user){
      setError("Invalid email or password");
      return;
    }


    if(user.role === "admin"){
      window.location.href = "/admin/dashboard";
    }
    else if(user.role === "driver"){
      window.location.href = "/driver/dashboard";
    }

  };

  return (

    <div
      className="login-container"
      style={{ backgroundImage:`url(${bgImage})` }}
    >

      <div className="login-card">

        <h1>Smart Logistics</h1>
        <p>Login to your account</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;