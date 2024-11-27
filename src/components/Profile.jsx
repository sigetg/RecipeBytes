import React from "react";
import css from './../styles/Profile.module.css'
import Avatar from './../assets/Avatar.png'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { TextField, IconButton, InputAdornment } from '@mui/material';

export default function Pantry() {
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.uid;
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return <main className={css.container}>
    <section className={css.profileAvatar}>
      <img
        src={Avatar}
        alt="Avatar"
      />
    </section>
    <section className={css.accountInfo}>
      <div className={css.name}>
        <label for="name">Name:</label><br />
        <input
          id={userId}
          name="name"
          value={user.displayName} 
          disabled
        />
      </div>
      <div className={css.email}>
        <label for="name">Email:</label><br />
        <input
          id={userId}
          name="email"
          value={user.email}
          disabled
        />
      </div>
    </section>
    <section className={css.options}>
      <Stack direction="row" spacing={2}>
        <Button variant="text" sx={{fontFamily: "'Patrick Hand SC', cursive", fontSize: 18, border: 1}}>
          Update Profile
        </Button>
        {user && ( <Button variant="text" onClick={handleLogout} sx={{fontFamily: "'Patrick Hand SC', cursive", fontSize: 18, border: 1}}>
          Logout
        </Button> )}
      </Stack>
    </section>
  </main>
}
