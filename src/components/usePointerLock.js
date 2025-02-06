import { useState, useEffect } from 'react';

export const usePointerLock = () => {
  const [pointerLocked, setPointerLocked] = useState(false);

  useEffect(() => {
    const handlePointerLockChange = () => {
      setPointerLocked(!!document.pointerLockElement);
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => {
      document.removeEventListener(
        'pointerlockchange',
        handlePointerLockChange,
      );
    };
  }, []);

  const reqInside = () => {
    try {
      document.body.requestPointerLock();
    } catch (error) {
      console.error('Pointer Lock 오류:', error);
    }
  };

  return { pointerLocked, reqInside };
};
