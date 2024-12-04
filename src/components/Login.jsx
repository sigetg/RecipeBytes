import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { signInUser } from "../auth";
import css from "./../styles/Login.module.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import VisibilityRoundedOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityRoundedIcon from '@mui/icons-material/Visibility';
import { TextField, IconButton, InputAdornment } from '@mui/material';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const handleTogglePassword = (id) => {
      setShowPassword(!showPassword)
  }

  const handleLogin = async () => {
    try {
      const user = await signInUser(email, password);
      console.log("Logged in:", user);
      navigate('/home');
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.login}>
        <h1>Login</h1>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityRoundedIcon sx={{cursor: "pointer"}} /> :  <VisibilityRoundedOffIcon sx={{cursor: "pointer", outline: false}} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" spacing={2}>
          <Button variant="text" onClick={handleLogin} sx={{fontFamily: "'Patrick Hand SC', cursive", fontSize: 18, border: 1}}>
            Login
          </Button>
          <Button variant="text" onClick={() => navigate('/signup')} sx={{fontFamily: "'Patrick Hand SC', cursive", fontSize: 18, border: 1}}>
            Go to Sign Up
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default Login;