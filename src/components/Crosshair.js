import React from 'react';

const Crosshair = ({ Chair, view }) => {
  return (
    // 점
    Chair === 'dot' ? (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '5px',
          height: '5px',
          backgroundColor: 'red',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          zIndex: 100,
          visibility: view ? 'visible' : 'hidden',
        }}
      />
    ) : (
      ''
    )
  );
};

export default Crosshair;
