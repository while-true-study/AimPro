import React, { useRef, useState, useEffect, use } from 'react';
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

function ClickableMesh({ onRemove, position, color }) {
  const stating = useGameStore((state) => state.state);
  // 클릭하기
  const meshRef = useRef();
  const handleClick = () => {
    if (onRemove) onRemove(); // 부모에서 전달된 제거 함수 호출
    console.log('Mesh removed!');
  };
  return (
    <mesh
      ref={meshRef}
      onClick={stating == 'playing' ? handleClick : undefined}
      position={position}
      userData={{ onClick: handleClick }} // userData에 onClick 저장
    >
      <sphereGeometry args={[0.5]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

function App() {
  const timer = useGameStore((state) => state.timer);
  const stating = useGameStore((state) => state.state);
  const [meshes, setMeshes] = useState([
    { id: 1, position: [0, 3, -5] },
    { id: 2, position: [0, 4, -5] },
    { id: 3, position: [0, 5, -5] },
    { id: 4, position: [0, 6, -5] },
  ]);

  const isPositionValid = (newPosition, existingPositions, minDistance = 1) => {
    // 괜찮은 위치인가
    for (const pos of existingPositions) {
      const distance = Math.sqrt(
        Math.pow(newPosition[0] - pos[0], 2) +
          Math.pow(newPosition[1] - pos[1], 2),
      );
      if (distance < minDistance) return false; // 충돌 발생
    }
    return true; // 충돌 없음
  };

  // 새로운 랜덤 위치 생성 함수
  const generateRandomPosition = (existingPositions) => {
    let newPosition;
    let attempts = 0;
    do {
      newPosition = [
        Math.random() * 5 - 2.5, // x: -5 ~ 5
        Math.random() * 5 - 2.5, // y: -5 ~ 5
        // -5, // z 고정
        Math.random() * 2 - 5, // y: -5 ~ 5
      ];
      attempts++;
      if (attempts > 100) break;
    } while (!isPositionValid(newPosition, existingPositions));
    return newPosition;
  };

  const removeMesh = (id) => {
    // 지우기
    setMeshes((prevMeshes) => {
      const filteredMeshes = prevMeshes.filter((mesh) => mesh.id !== id); // 제거시킴
      setScore(timer >= 20 ? score + 500 : score + 1000);
      const newId = Math.max(...prevMeshes.map((mesh) => mesh.id)) + 1; // 새로운 id생성
      const newPosition = generateRandomPosition(
        // position만들기
        filteredMeshes.map((mesh) => mesh.position),
      );
      const newMesh = { id: newId, position: newPosition };

      return [...filteredMeshes, newMesh];
    });
  };
  const [score, setScore] = useState(0);
  const [userColor, setUserColor] = useState('blue');
  const [tagetClick, setTargetClick] = useState(0);
  const [backGroundClick, setBackGroundClick] = useState(0);
  const rate = (100 / (backGroundClick / tagetClick)).toFixed(2);
  const [viewing, setViewing] = useState(false);
  useEffect(() => {
    console.log(tagetClick, '/', backGroundClick, '/', stating);
  }, [tagetClick, backGroundClick]);
  return (
    <>
      <Crosshair Chair={'dot'} />
      <Scorebar
        score={score}
        time={timer}
        rate={rate}
        view={viewing}
      ></Scorebar>
      <ClicktoStart></ClicktoStart>
      <Canvas style={{ height: '100%', width: '100%' }}>
        <Background
          onBackgroundClick={() => setBackGroundClick(backGroundClick + 1)}
        ></Background>
        <directionalLight
          position={[5, 10, 5]} // 빛의 위치
          intensity={1.5} // 빛의 강도
        />
        {stating == 'wating' ? (
          <Infopanel></Infopanel>
        ) : stating == 'playing' ? (
          meshes.map((mesh) => (
            <ClickableMesh
              color={userColor}
              position={mesh.position}
              key={mesh.id}
              onRemove={() => {
                removeMesh(mesh.id);
                setTargetClick(tagetClick + 1);
              }}
            />
          ))
        ) : (
          <Result></Result>
        )}
        <Controls></Controls>
      </Canvas>
    </>
  );
}

export default App;
