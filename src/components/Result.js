import { Text } from '@react-three/drei';
import React, { useEffect } from 'react';
import { useGameStore } from './Store';

const Result = ({ init }) => {
  const Gamerecord = useGameStore((state) => state.gamerecord);
  const setstate = useGameStore((state) => state.setState);
  const handleClick = () => {
    setstate('playing');
    init();
  };
  const HomeClick = () => {
    setstate('wating');
    init();
  };
  return (
    <>
      <Text
        position={[-1, 3, 0]}
        color="black"
        fontSize={0.8}
        onClick={handleClick}
      >
        다시하기
      </Text>
      <Text
        position={[2, 3, 0]}
        color="black"
        fontSize={0.8}
        onClick={HomeClick}
      >
        홈으로
      </Text>
      <Text
        position={[-0.5, 2, 0]}
        color="black"
        fontSize={0.7}
        onClick={handleClick}
      >
        점수
      </Text>
      <Text
        position={[2, 2, 0]}
        color="black"
        fontSize={0.7}
        onClick={handleClick}
      >
        명중률
      </Text>
      {Object.keys(Gamerecord).map((id) => {
        return (
          <Text key={id} position={[0, 1 - id, 0]} color="black" fontSize={0.8}>
            Id {Number(id) + 1} {Gamerecord[id].score} {Gamerecord[id].rate}
          </Text>
        );
      })}
    </>
  );
};

export default Result;
