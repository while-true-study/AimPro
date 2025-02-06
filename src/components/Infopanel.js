import { Text } from '@react-three/drei';
import React from 'react';
import { useGameStore } from './Store';

const Infopanel = () => {
  const setstate = useGameStore((state) => state.setState);
  const state = useGameStore((state) => state.state);
  const handleClick = () => {
    setstate('playing');
  };
  const onClick = () => {
    setstate('optioning');
  };
  return (
    <>
      {state === 'wating' ? (
        <>
          <Text
            position={[0, 1, 0]}
            color="black"
            fontSize={0.8}
            onClick={handleClick}
          >
            Start
          </Text>
          <Text
            position={[0, -1, 0]}
            color="black"
            fontSize={0.8}
            onClick={onClick}
          >
            Option
          </Text>
        </>
      ) : null}
    </>
  );
};

export default Infopanel;
