import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { TextField, Button, Typography, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
  
    const handlePasswordReset = async () => {
      const auth = getAuth();
      try {
        await sendPasswordResetEmail(auth, email);
        setMessage("Password reset email sent. Check your inbox.");
      } catch (error) {
        setMessage("Error sending password reset email. Please try again.");
        console.error(error);
      }
    };
  
    return (
      <Box sx={{ maxWidth: 400, margin: "auto", textAlign: "center", padding: "20px" }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Forgot Password
        </Typography>
        <TextField
          label="Enter your email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Stack direction="row" spacing={2} sx={{ marginTop: 3, justifyContent: "center" }}>
          <Button variant="contained" onClick={handlePasswordReset}>
            Reset Password
          </Button>
          <Button variant="outlined" onClick={() => navigate("/login")}>
            Back
          </Button>
        </Stack>
        {message && (
          <Typography color="primary" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    );
};

