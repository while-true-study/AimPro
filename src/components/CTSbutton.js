import React from 'react';

const CTSbutton = ({ onClick, visible }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 24px',
        fontSize: '16px',
        transition: 'opacity 1s ease',
        opacity: visible ? 1 : 0,
        borderRadius: '5px',
      }}
    >
      Click to Start
    </button>
  );
};

export default CTSbutton;
