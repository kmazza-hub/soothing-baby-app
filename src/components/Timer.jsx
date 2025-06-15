import React, { useState, useEffect, useRef } from "react";
import "./Timer.css";

function Timer({ onStart, onFinish }) {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showDoneMessage, setShowDoneMessage] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = (duration) => {
    clearInterval(intervalRef.current);
    setSeconds(duration);
    setActive(true);
    setPaused(false);
    setShowDoneMessage(false);
    if (onStart) onStart(); // 🔔 Notify parent App that timer started
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setPaused(true);
  };

  const resumeTimer = () => {
    setPaused(false);
    setActive(true);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setSeconds(0);
    setActive(false);
    setPaused(false);
    setShowDoneMessage(false);
  };

  useEffect(() => {
    if (active && !paused && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && active) {
      clearInterval(intervalRef.current);
      setActive(false);
      setShowDoneMessage(true);
      if (onFinish) onFinish(); // 🔔 Notify parent App that timer ended
    }

    return () => clearInterval(intervalRef.current);
  }, [active, paused, seconds]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  return (
    <div className="timer">
      <p className="timer__display">Time remaining: {formatTime(seconds)}</p>

      {showDoneMessage && (
        <p className="timer__done-message">Time’s up! 🎉</p>
      )}

      <div className="timer__buttons">
        <button onClick={() => startTimer(300)}>5 min</button>
        <button onClick={() => startTimer(600)}>10 min</button>
        <button onClick={() => startTimer(900)}>15 min</button>
        <button onClick={() => startTimer(1200)}>20 min</button>
      </div>

      <div className="timer__controls">
        <button onClick={paused ? resumeTimer : pauseTimer} disabled={!active}>
          {paused ? "Resume" : "Pause"}
        </button>
        <button onClick={resetTimer} disabled={!active && seconds === 0}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
