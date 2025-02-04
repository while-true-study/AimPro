import { Text } from '@react-three/drei';
import React, { useEffect } from 'react';
import { useGameStore } from './Store';

const Result = ({ init }) => {
  const Gamerecord = useGameStore((state) => state.gamerecord);
  useEffect(() => {
    console.log(Gamerecord);
  });
  const setstate = useGameStore((state) => state.setState);
  const handleClick = () => {
    setstate('playing');
    init();
  };
  return (
    <>
      <Text position={[-2, 3, 0]} color="black" fontSize={0.8}>
        결과
      </Text>
      <Text
        position={[1, 3, 0]}
        color="black"
        fontSize={0.8}
        onClick={handleClick}
      >
        다시하기
      </Text>
      {Object.keys(Gamerecord).map((id) => {
        return (
          <Text key={id} position={[0, 2 - id, 0]} color="black" fontSize={0.8}>
            {Number(id) + 1} {Gamerecord[id].score} {Gamerecord[id].rate}
          </Text>
        );
      })}
    </>
  );
};

export default Result;
