import React from 'react';
import { useGameStore } from './Store';

const Background = ({ onBackgroundClick }) => {
  const stating = useGameStore((state) => state.state);
  return (
    <mesh
      position={[0, 0, -10]}
      onClick={stating === 'playing' ? onBackgroundClick : undefined}
    >
      <planeGeometry args={[100, 100]}></planeGeometry>
      {/* <meshBasicMaterial color="gray"></meshBasicMaterial> */}
      <meshStandardMaterial color="white" roughness={0.3} metalness={0.2} />
    </mesh>
  );
};

export default Background;
