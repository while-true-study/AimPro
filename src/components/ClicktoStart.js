import React, { useEffect, useState } from 'react';

const ClicktoStart = ({ reqInside, pointerLocked }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleClick = (e) => {
    if (pointerLocked) {
      e.preventDefault();
      return;
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: '100%',
        height: '100%',
        opacity: 0.65,
        backgroundColor: 'blue',
        zIndex: 50,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <button
        onClick={reqInside}
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
    </div>
  );
};

export default ClicktoStart;
