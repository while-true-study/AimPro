import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import Background from '../components/Background';
import Scorebar from '../components/ScoreBar';
import Controls from '../components/Controls';
import Crosshair from '../components/Crosshair';
import Infopanel from '../components/Infopanel';
import { useStore } from 'zustand';
import { useGameStore } from '../components/Store';
import Result from '../components/Result';
import ClicktoStart from '../components/ClicktoStart';
import GenMesh from '../components/GenMesh';
import Option from '../components/Option';
import { generateRandomPosition } from '../utils/isPositionValid';

function App() {
  const timer = useGameStore((state) => state.timer);
  const stating = useGameStore((state) => state.state);
  const score = useGameStore((state) => state.score);
  const [tagetClick, setTargetClick] = useState(0);
  const [backGroundClick, setBackGroundClick] = useState(0);
  const rateCal = (100 / (backGroundClick / tagetClick)).toFixed(2);

  const initing = () => {
    setTargetClick(0);
    setBackGroundClick(0);
  };

  useEffect(() => {
    const rateCal = (100 / (backGroundClick / tagetClick)).toFixed(2);
    setRate(rateCal);
  }, [rateCal]);

  const rate = useGameStore((s) => s.rate);
  const setRate = useGameStore((s) => s.setRate);

  const [pointerLocked, setPointerLocked] = useState(false);
  const rendererRef = useRef(null);
  useEffect(() => {
    const handlePointerLockChange = () => {
      if (null != document.pointerLockElement) {
        console.log('들어감?');
        setPointerLocked(true); // 들어감
      } else {
        console.log(document.pointerLockElement); // 탈출하면 null
        setPointerLocked(false); // 나감
      }
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => {
      // Cleanup
      document.removeEventListener(
        'pointerlockchange',
        handlePointerLockChange,
      );

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.domElement.remove();
        rendererRef.current = null;
      }
    };
  }, []);

  const [meshes, setMeshes] = useState([
    { id: 1, position: [0, 3, -5] },
    { id: 2, position: [0, 4, -5] },
    { id: 3, position: [0, 5, -5] },
    { id: 4, position: [0, 6, -5] },
  ]);

  const setScore = useGameStore((state) => state.setScore);
  const removeMesh = (id) => {
    setMeshes((prevMeshes) => {
      const filteredMeshes = prevMeshes.filter((mesh) => mesh.id !== id); // 제거시킴
      setScore(timer >= 20 ? 500 : 1000);
      const newId = Math.max(...prevMeshes.map((mesh) => mesh.id)) + 1; // 새로운 id생성
      const newPosition = generateRandomPosition(
        filteredMeshes.map((mesh) => mesh.position), // 새로운 위치 생성
      );
      const newMesh = { id: newId, position: newPosition };

      return [...filteredMeshes, newMesh];
    });
  };

  const reqInside = () => {
    try {
      setPointerLocked(true);
      document.body.requestPointerLock();
    } catch (error) {
      console.error('Pointer Lock 오류:', error);
    }
  };
  return (
    <>
      <Crosshair Chair={'Cross'} view={pointerLocked ? true : false} />
      <Scorebar
        score={score}
        time={timer}
        rate={rate}
        view={pointerLocked}
      ></Scorebar>
      {pointerLocked ? null : (
        <ClicktoStart
          reqInside={reqInside}
          pointerLocked={pointerLocked}
        ></ClicktoStart>
      )}
      <Canvas
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <Background
          onBackgroundClick={() => setBackGroundClick(backGroundClick + 1)}
        ></Background>
        <directionalLight
          position={[5, 9, 5]} // 빛의 위치
          intensity={1.5} // 빛의 강도
        />
        {stating === 'wating' && <Infopanel></Infopanel>}
        {stating === 'playing' &&
          meshes.map((mesh) => (
            <GenMesh
              color="blue"
              position={mesh.position}
              key={mesh.id}
              onRemove={() => {
                removeMesh(mesh.id);
                setTargetClick(tagetClick + 1);
              }}
            ></GenMesh>
          ))}
        {stating === 'Optioning' && <Option></Option>}
        {stating === '' && <Result init={initing}></Result>}
        <Controls></Controls>
      </Canvas>
    </>
  );
}

export default App;
