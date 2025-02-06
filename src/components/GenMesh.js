import React, { useRef } from 'react';
import { useGameStore, useOptionStore } from './Store';

const GenMesh = ({ onRemove, position }) => {
  const stating = useGameStore((state) => state.state);
  // 클릭하기
  const meshRef = useRef();

  const handleClick = () => {
    if (onRemove) onRemove(); // 부모에서 전달된 제거 함수 호출
  };
  const MeshColor = useOptionStore((state) => state.MeshColor);
  return (
    <mesh
      ref={meshRef}
      onClick={stating === 'playing' ? handleClick : undefined}
      position={position}
      // userData={{ onClick: handleClick }} // userData에 onClick 저장
    >
      <sphereGeometry args={[0.5]} />
      <meshStandardMaterial color={MeshColor} roughness={0.3} metalness={0.2} />
    </mesh>
  );
};

export default GenMesh;
