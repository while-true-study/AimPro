import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGameStore, useOptionStore } from '../components/Store';
import Background from '../components/Background';
import Scorebar from '../components/ScoreBar';
import Controls from '../components/Controls';
import Crosshair from '../components/Crosshair';
import Infopanel from '../components/Infopanel';
import Result from '../components/Result';
import ClicktoStart from '../components/ClicktoStart';
import GenMesh from '../components/GenMesh';
import Option from '../components/Option';
import { usePointerLock } from '../components/usePointerLock';
import { useMeshes } from '../components/useMesh';

function App() {
  const timer = useGameStore((state) => state.timer);
  const stating = useGameStore((state) => state.state);
  const score = useGameStore((state) => state.score);
  const rate = useGameStore((s) => s.rate);
  const setRate = useGameStore((s) => s.setRate);
  const MeshCount = useOptionStore((state) => state.MeshCount);

  const [targetClick, setTargetClick] = useState(0);
  const [backgroundClick, setBackGroundClick] = useState(0);
  const { pointerLocked, reqInside } = usePointerLock();
  const { meshes, removeMesh } = useMeshes(
    MeshCount,
    stating,
    timer,
    useGameStore((state) => state.setScore),
  );

  useEffect(() => {
    const rateCal = (100 / (backgroundClick / targetClick)).toFixed(2);
    setRate(rateCal);
  }, [targetClick, backgroundClick, setRate]);

  const initing = () => {
    setTargetClick(0);
    setBackGroundClick(0);
  };

  return (
    <>
      <Crosshair view={pointerLocked} />
      <Scorebar score={score} rate={rate} />
      {pointerLocked ? null : (
        <ClicktoStart reqInside={reqInside} pointerLocked={pointerLocked} />
      )}
      <Canvas style={{ height: '100%', width: '100%' }}>
        <Background
          onBackgroundClick={() => setBackGroundClick(backgroundClick + 1)}
        />
        <directionalLight position={[5, 9, 5]} intensity={1.5} />
        {stating === 'wating' && <Infopanel />}
        {stating === 'playing' &&
          meshes.map((mesh) => (
            <GenMesh
              position={mesh.position}
              key={mesh.id}
              onRemove={() => {
                removeMesh(mesh.id);
                setTargetClick(targetClick + 1);
              }}
            />
          ))}
        {stating === 'optioning' && <Option />}
        {stating === 'endgame' && <Result init={initing} />}
        <Controls />
      </Canvas>
    </>
  );
}

export default App;
