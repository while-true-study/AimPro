import React, { useRef, useState } from 'react';
import { useGameStore } from './Store';

function ClickableMesh({ onRemove, position, color }) {
  const stating = useGameStore((state) => state.state);
  // 클릭하기
  const meshRef = useRef();
  const handleClick = () => {
    if (onRemove) onRemove(); // 부모에서 전달된 제거 함수 호출
    console.log('Mesh removed!');
  };
  return (
    <mesh
      ref={meshRef}
      onClick={stating == 'playing' ? handleClick : undefined}
      position={position}
      userData={{ onClick: handleClick }} // userData에 onClick 저장
    >
      <sphereGeometry args={[0.5]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

const GenMesh = ({ onRemove, position, color }) => {
  const stating = useGameStore((state) => state.state);
  // 클릭하기
  const meshRef = useRef();

  const handleClick = () => {
    if (onRemove) onRemove(); // 부모에서 전달된 제거 함수 호출
    console.log('Mesh removed!');
  };

  return (
    <mesh
      color="blue"
      ref={meshRef}
      onClick={stating === 'playing' ? handleClick : undefined}
      position={position}
      // userData={{ onClick: handleClick }} // userData에 onClick 저장
    >
      <sphereGeometry args={[0.5]} />
      <meshStandardMaterial color="blue" roughness={0.3} metalness={0.2} />
    </mesh>
  );
};

export default GenMesh;
