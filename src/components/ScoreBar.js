import React, { useEffect } from 'react';
import './Scorebar.css';
import { useGameStore } from './Store';

const Scorebar = ({ score, rate, time, view }) => {
  const SCBview = useGameStore((state) => state.scorebarviewing);
  // const { timer, setTimer, setEnd } = useGameStore((state) => ({
  //   timer: state.timer,
  //   setTimer: state.setTimer,
  //   setEnd: state.setEnd,
  // }));

  const timer = useGameStore((state) => state.timer);
  const setTimer = useGameStore((state) => state.setTimer);
  const setEnd = useGameStore((state) => state.setEnd);
  const setState = useGameStore((state) => state.setState);

  useEffect(() => {
    if (timer <= 0) {
      setState('Endgame');
      return;
    }
    const timerId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timer, setTimer, setEnd]);

  return (
    <div
      className="ScoreBar_body"
      style={{ visibility: SCBview ? 'visible' : 'hidden' }}
    >
      <div className="score box">
        <p>Score</p>
        <span>{score}</span>
      </div>
      <div className="time box">
        <p>남은 초</p>
        <span>{timer}</span>
      </div>
      <div className="rate box">
        <p>명중률</p>
        <span>{rate}</span>
      </div>
    </div>
  );
};

export default Scorebar;
