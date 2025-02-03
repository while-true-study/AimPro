import { Text } from '@react-three/drei';
import React from 'react';
import { useGameStore } from './Store';

const Infopanel = () => {
  const setstate = useGameStore((state) => state.setState);
  const handleClick = () => {
    setstate('playing');
  };
  return (
    <>
      <Text
        position={[0, 1, 0]}
        color="black"
        fontSize={0.8}
        onClick={handleClick}
      >
        Start
      </Text>
      <Text position={[0, -1, 0]} color="black" fontSize={0.8}>
        Option
      </Text>
    </>
  );
};

export default Infopanel;
