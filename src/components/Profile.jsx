import React, { useState } from 'react';
import css from './../styles/Profile.module.css';
import Avatar from './../assets/Avatar.png';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';

export default function Pantry() {
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.uid;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoURL, setPhotoURL] = useState(Avatar);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const toggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(auth.currentUser, {
      displayName: firstName && lastName ? `${firstName} ${lastName}` : user.displayName,
    });
    navigate('/');
    setShowForm(false);
  };

  // const handleChange = async (e) => {
  //   if (e.target.files[0]) {
  //     setPhoto(e.target.files[0]);
  //   }
  //   uploadProfileImage(photo, setLoading).then((url) => {
  //     setPhotoURL(url);
  //   });
  // };

//   // storage for user's profile image
//  async function uploadProfileImage(file, userId, setLoading) {
//   const storageRef = ref(storage, `profileImages/${userId}`);
//   setLoading(true);
//   await uploadBytes(storageRef, file);
//   setLoading(false);
//   return getDownloadURL(storageRef);
// }

  return <main className={css.container}>
    <section className={css.profileAvatar}>
      <img
        src={photoURL}
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
    <section>
      {showForm && (
            <form onSubmit={handleSubmit} className={css.form}>
              <h2>Update Profile</h2>
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
                variant="outlined"
                margin="normal"
                onChange={(e) => setPhotoURL(e.target.value)}
                // onClick={handleChange}
                type="file"
            />
            <button type="submit" className={css.profileUpdateButton}>Save</button>
            </form>
          )}
      <section className={css.options}>
        <Stack direction="row" spacing={2}>
          <Button variant="text" onClick={toggleForm} sx={{fontFamily: "'Patrick Hand SC', cursive", fontSize: 18, border: 1}}>
            Update Profile
          </Button>
          {user && ( <Button variant="text" onClick={handleLogout} sx={{fontFamily: "'Patrick Hand SC', cursive", fontSize: 18, border: 1}}>
            Logout
          </Button> )}
        </Stack>
      </section>
    </section>
  </main>
}
