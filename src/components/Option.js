import { Text } from '@react-three/drei';
import React, { useEffect } from 'react';
import { useGameStore, useOptionStore } from './Store';

const Option = () => {
  const setState = useGameStore((state) => state.setState);
  const ColorChange = useOptionStore((state) => state.ColorChange);
  const ChangeCH = useOptionStore((state) => state.ChangeCH);
  const setMeshCount = useOptionStore((state) => state.setMeshCount);
  const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'violet',
    'black',
  ];
  const positions = [-3.75, -2.25, -0.75, 0.75, 2.25, 3.75]; // X 좌표
  const dotPatterns = [
    [[0, 0, 0.01]], // 1
    [
      [-0.3, 0.3, 0.01],
      [0.3, -0.3, 0.01],
    ], // 2
    [
      [-0.3, 0.3, 0.01],
      [0, 0, 0.01],
      [0.3, -0.3, 0.01],
    ], // 3
    [
      [-0.3, 0.3, 0.01],
      [-0.3, -0.3, 0.01],
      [0.3, 0.3, 0.01],
      [0.3, -0.3, 0.01],
    ], // 4
    [
      [-0.3, 0.3, 0.01],
      [-0.3, -0.3, 0.01],
      [0.3, 0.3, 0.01],
      [0.3, -0.3, 0.01],
      [0, 0, 0.01],
    ], // 5
    [
      [-0.3, 0.4, 0.01],
      [-0.3, 0, 0.01],
      [-0.3, -0.4, 0.01],
      [0.3, 0.4, 0.01],
      [0.3, 0, 0.01],
      [0.3, -0.4, 0.01],
    ], // 6
  ];
  return (
    <>
      <Text color="black" position={[0, 3.5, 0]} fontSize={0.5}>
        Change Ball Color
      </Text>
      {colors.map((color, i) => (
        <mesh
          position={[-3.6 + i * 1.2, 2.5, 0]}
          onClick={() => ColorChange(color)}
        >
          <sphereGeometry args={[0.5]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
        </mesh>
      ))}
      <Text color="black" position={[0, 1.5, 0]} fontSize={0.5}>
        Change Crosshair
      </Text>
      <group position={[1.5, 0.5, 0]} onClick={() => ChangeCH('Cross')}>
        {/* 세로 막대 */}
        <mesh>
          <boxGeometry args={[0.2, 1, 0.2]} />
          <meshStandardMaterial color="red" />
        </mesh>
        {/* 가로 막대 */}
        <mesh>
          <boxGeometry args={[1, 0.2, 0.2]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </group>

      <mesh position={[-1.5, 0.5, 0]} onClick={() => ChangeCH('dot')}>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color="red" roughness={0.3} metalness={0.2} />
      </mesh>

      <Text color="black" position={[0, -0.5, 0]} fontSize={0.5}>
        Change Number of Balls
      </Text>
      {positions.map((x, i) => (
        <group position={[x, -1.5, 0]} onClick={() => setMeshCount(i + 1)}>
          {/* 면 */}
          <mesh>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial color="white" side={2} />
          </mesh>

          {/* 숫자 */}
          {dotPatterns[i].map((pos, i) => (
            <mesh key={i} position={pos}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color="black" />
            </mesh>
          ))}
        </group>
      ))}
      <Text
        color="black"
        position={[0, -2.5, 0]}
        fontSize={0.5}
        onClick={() => setState('wating')}
      >
        Go Back
      </Text>
    </>
  );
};

export default Option;
