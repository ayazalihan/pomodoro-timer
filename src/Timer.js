import React, { useState, useEffect } from "react";

function Timer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);

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
  }, [seconds]);

  const handleMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const handleSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="timer">
      <div className="message">
        {message && <div>Short break! New session starts in:</div>}
      </div>
      <div className="clock">
        {handleMinutes}:{handleSeconds}
      </div>
    </div>
  );
}

export default Timer;
