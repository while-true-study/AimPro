import { Html, Text } from '@react-three/drei';
import React, { useEffect } from 'react';
import { useGameStore, useOptionStore } from './Store';
import SlideBar from './SlideBar';

const Option = () => {
  const view = useOptionStore((state) => state.OptionView);
  const state = useGameStore((state) => state.state);
  const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indogo',
    'violet',
  ];
  useEffect(() => {
    console.log(view);
  }, [view]);
  return (
    <>
      <mesh>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color={'blue'} roughness={0.3} metalness={0.2} />
      </mesh>
    </>
  );
};

export default Option;
