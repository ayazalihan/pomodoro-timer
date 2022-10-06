import React, { useState, useEffect, useRef } from 'react';

function Timer() {
  const mode = {
    pause: 0,
    start: 1,
  };

  const time = {
    pomodoro: 25,
    break: 5,
  };
  const session = {
    study: 0,
    rest: 1,
  };

  const [minutes, setMinutes] = useState(time.pomodoro);
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState(mode.pause);
  const [option, setOption] = useState(session.study);
  const intervalRef = useRef();

  useEffect(() => {
    document.title = `${handleMinutes}:${handleSeconds} | Pomodoro Timer`;
  });

  useEffect(() => {
    if (status === mode.start) {
      intervalRef.current = setInterval(() => {
        clearInterval(intervalRef.current);

        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            if (option === session.study) {
              setMinutes(time.pomodoro);
              setSeconds(0);
            } else if (option === session.rest) {
              setMinutes(time.break);
              setSeconds(0);
            }
            setStatus(mode.pause);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (status === mode.pause) {
      clearInterval(intervalRef.current);
    }
  }, [
    seconds,
    minutes,
    status,
    mode.pause,
    mode.start,
    option,
    session.rest,
    session.study,
    time.break,
    time.pomodoro,
  ]);

  const handleMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const handleSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const startTimer = () => {
    if (status === mode.pause) {
      setStatus(mode.start);
    } else {
      setStatus(mode.pause);
    }
  };
  const pomodoroTimer = () => {
    setOption(session.study);
    setStatus(mode.pause);
    setMinutes(time.pomodoro);
    setSeconds(0);
  };
  const breakTimer = () => {
    setOption(session.rest);
    setStatus(mode.pause);
    setMinutes(time.break);
    setSeconds(0);
  };

  return (
    <div className='timer'>
      <div>
        <button
          onClick={pomodoroTimer}
          className={'btn ' + (option === session.study ? 'selected' : null)}
        >
          pomodoro
        </button>
        <button
          className={'btn ' + (option === session.rest ? 'selected' : null)}
          onClick={breakTimer}
        >
          break
        </button>
      </div>
      <div className='clock'>
        {handleMinutes}:{handleSeconds}
      </div>
      <button className='btn' onClick={startTimer}>
        {status === mode.pause ? 'start' : 'pause'}
      </button>
    </div>
  );
}

export default Timer;
