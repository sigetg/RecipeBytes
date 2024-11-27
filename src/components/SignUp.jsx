import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { css } from '@emotion/react';
import style from '../styles/SignUp.module.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import VisibilityRoundedOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityRoundedIcon from '@mui/icons-material/Visibility';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const [showPassword, setShowPassword] = useState(false)
  const handleTogglePassword = (id) => {
      setShowPassword(!showPassword)
  }

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      console.log('Signed up:', user);
      navigate('/');
    } catch (error) {
      console.error('Sign-up failed:', error.message);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.signup}>
        <h1>Sign Up</h1>
        <TextField
          label="First Name"
          variant="outlined"
          margin="normal"
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
        />
        <TextField
          label="Last Name"
          variant="outlined"
          margin="normal"
          onChange={(e) => setLastName(e.target.value)}
          type="text"
        />
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
          <Button variant="text" onClick={handleSignUp} sx={{fontFamily: "'Patrick Hand SC', cursive", fontSize: 18, border: 1}}>
            Sign Up
          </Button>
          <Button variant="text" onClick={() => navigate('/login')} sx={{fontFamily: "'Patrick Hand SC', cursive", fontSize: 18, border: 1}}>
            Go To Login
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default SignUp;