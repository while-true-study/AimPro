import React, { useEffect } from 'react';
import { useOptionStore } from './Store';

const Crosshair = ({ view }) => {
  const Chair = useOptionStore((state) => state.crosshair);
  useEffect(() => {
    console.log(Chair);
  }, [Chair]);
  return (
    // 점
    <>
      {Chair === 'dot' && (
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
      )}
      {Chair === 'Cross' && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '20px',
              height: '2px',
              backgroundColor: 'red',
              transform: 'translate(-50%, -50%)',
              zIndex: 100,
              visibility: view ? 'visible' : 'hidden',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '2px',
              height: '20px',
              backgroundColor: 'red',
              transform: 'translate(-50%, -50%)',
              zIndex: 100,
              visibility: view ? 'visible' : 'hidden',
            }}
          />
        </>
      )}
    </>
  );
};

export default Crosshair;
