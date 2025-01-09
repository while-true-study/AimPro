import React from 'react';
import './Scorebar.css';

const Scorebar = ({ score, rate, time }) => {
  return (
    <div className="ScoreBar_body">
      <div className="score box">Pt{score}</div>
      <div className="time box">시간{time}</div>
      <div className="rate box">명중률{rate}</div>
    </div>
  );
};

export default Scorebar;
