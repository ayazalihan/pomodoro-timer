import React, { useState, useEffect, useRef } from "react";

function Timer() {
  const mode = {
    pause: 0,
    start: 1,
    default: 2,
  };
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState(false);
  const [status, setStatus] = useState(mode.default);
  const intervalRef = useRef();

  useEffect(() => {
    if (status === mode.start) {
      intervalRef.current = setInterval(() => {
        clearInterval(intervalRef.current);

        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let minutes = message ? 24 : 4;
            let seconds = 59;

            setSeconds(seconds);
            setMinutes(minutes);
            setMessage(!message);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (status === mode.pause) {
      clearInterval(intervalRef.current);
    }
  }, [seconds, minutes, message, status, mode.pause, mode.start]);

  const handleMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const handleSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const startTimer = () => setStatus(mode.start);
  const pauseTimer = () => setStatus(mode.pause);
  const stopTimer = () => {
    setStatus(mode.pause);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="timer">
      <div className="message">
        {message && <div>Short break! New session starts in:</div>}
      </div>
      <div className="clock">
        {handleMinutes}:{handleSeconds}
      </div>
      <button className="btn" onClick={startTimer}>
        Start Pomodoro
      </button>
      <button className="btn" onClick={pauseTimer}>
        Pause
      </button>
      <button className="btn" onClick={stopTimer}>
        Stop
      </button>
    </div>
  );
}

export default Timer;
