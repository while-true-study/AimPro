import React from 'react';
import './Scorebar.css';

const Scorebar = ({ score, rate, time }) => {
  return (
    <div className="ScoreBar_body">
      <div className="score box">
        <p>Score</p>
        <span>{score}</span>
      </div>
      <div className="time box">
        <p>남은 초</p>
        <span>{time}</span>
      </div>
      <div className="rate box">
        <p>명중률</p>
        <span>{rate}</span>
      </div>
    </div>
  );
};

export default Scorebar;
