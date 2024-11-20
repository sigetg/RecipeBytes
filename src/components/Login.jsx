import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { signInUser } from "../auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await signInUser(email, password);
      console.log("Logged in:", user);
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate('/signup')}>Go To Sign Up</button>
    </div>
  );
};

export default Login;
