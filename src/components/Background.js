import React from 'react';
import { MeshBasicMaterial } from 'three';
import { Canvas, useThree } from '@react-three/fiber';

const Background = ({ onBackgroundClick }) => {
  return (
    <mesh position={[0, 0, -10]} onClick={onBackgroundClick}>
      <planeGeometry args={[100, 100]}></planeGeometry>
      <meshBasicMaterial color="gray"></meshBasicMaterial>
    </mesh>
  );
};

export default Background;
