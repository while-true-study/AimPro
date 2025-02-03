import React, { useEffect } from 'react';
import { useConTrolStore } from './Store';

const ClicktoStart = () => {
  const locked = useConTrolStore((state) => state.isLocked);
  const setIsLocked = useConTrolStore((state) => state.setIsLocked);

  useEffect(() => {
    const unsubscribe = useConTrolStore.subscribe(
      (state) => state.isLocked, // 구독할 상태
      (isLocked) => {
        // 상태가 변경될 때마다 실행할 로직
        setIsLocked(isLocked);
      },
    );

    // 클린업: 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, [setIsLocked]);
  return locked ? (
    <div
      style={{
        width: '100px',
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue',
        zIndex: 50,
        position: 'absolute', // 버튼을 절대 위치로 설정
        top: '50%', // 화면 중앙에 위치하도록 설정
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <button>Click to Start</button>
    </div>
  ) : null;
};

export default ClicktoStart;
