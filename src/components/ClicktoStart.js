import React, { useEffect, useState } from 'react';
import CTSbutton from './CTSbutton';

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
        backgroundColor: 'black',
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
      <CTSbutton onClick={reqInside} visible={visible}></CTSbutton>
    </div>
  );
};

export default ClicktoStart;
