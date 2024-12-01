import React, { useState } from "react";
import { Box, Typography, Button, MenuItem, Select } from "@mui/material";
import Countdown from "react-countdown";

const StepTimer = ({ defaultTimeInSeconds, onTimerComplete }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const [selectedTime, setSelectedTime] = useState(formatTime(defaultTimeInSeconds));
  const [isRunning, setIsRunning] = useState(false);
  const [key, setKey] = useState(0); // Unique key to reset Countdown

  const parseTime = (time) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds; // Convert mm:ss to total seconds
  };

  const handleStart = () => {
    setIsRunning(true);
    setKey((prevKey) => prevKey + 1); // Force Countdown to reinitialize
  };

  const handleReset = () => {
    setIsRunning(false);
    setKey((prevKey) => prevKey + 1); // Reset the timer
  };

  const CountdownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return (
        <Typography variant="h6" sx={{ color: "green" }}>
          Time's up!
        </Typography>
      );
    }
    return (
      <Typography variant="h4">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Typography>
    );
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i <= 59; i++) {
      for (let j = 0; j < 60; j += 15) {
        options.push(formatTime(i * 60 + j)); // 15-second increments
      }
    }
    return options;
  };

  const totalMilliseconds = parseTime(selectedTime) * 1000;

  return (
    <Box sx={{ textAlign: "center", margin: "20px 0" }}>
      <Typography variant="h6">Timer</Typography>
      {!isRunning && (
        <Select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          sx={{ marginBottom: "10px", width: "120px", textAlign: "center" }}
        >
          {generateTimeOptions().map((time) => (
            <MenuItem key={time} value={time}>
              {time}
            </MenuItem>
          ))}
        </Select>
      )}
      <Box>
        <Countdown
          key={key}
          date={Date.now() + totalMilliseconds}
          renderer={CountdownRenderer}
          autoStart={isRunning}
          onComplete={() => {
            onTimerComplete();
            setIsRunning(false); // Allow re-selection after completion
          }}
        />
      </Box>
      {!isRunning && (
        <Button
          variant="contained"
          onClick={handleStart}
          disabled={totalMilliseconds === 0}
          sx={{ margin: "10px", backgroundColor: "rgba(48, 108, 163, 0.82)" }}
        >
          Start
        </Button>
      )}
      {isRunning && (
        <Button variant="contained" onClick={handleReset} sx={{ backgroundColor:"rgba(48, 108, 163, 0.52)"}}>
          Reset
        </Button>
      )}
    </Box>
  );
};

export default StepTimer;
