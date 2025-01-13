import React, { useRef, useState, useEffect, use } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import Background from '../components/Background';
import Scorebar from '../components/ScoreBar';
import Controls from '../components/Controls';
import Crosshair from '../components/Crosshair';

function ClickableMesh({ onRemove, position, color }) {
  const meshRef = useRef();
  const handleClick = () => {
    if (onRemove) onRemove(); // 부모에서 전달된 제거 함수 호출
    console.log('Mesh removed!');
  };
  return (
    <mesh
      ref={meshRef}
      onClick={handleClick}
      position={position}
      userData={{ onClick: handleClick }} // userData에 onClick 저장
    >
      <sphereGeometry args={[0.5]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

function App() {
  const [timer, setTimer] = useState(60);
  const [end, setEnd] = useState(false);
  useEffect(() => {
    if (timer <= 0) {
      setEnd(true);
      return;
    }
    const timerId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timer]);

  useEffect(() => {
    const movePointer = (event) => {
      const xThreshold = 100;
      const yThreshold = 100;

      // 마우스가 화면의 특정 위치에 가까워지면 포인터를 구석으로 보냄
      if (event.clientX < xThreshold && event.clientY < yThreshold) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } else if (
        event.clientX > window.innerWidth - xThreshold &&
        event.clientY < yThreshold
      ) {
        window.scrollTo({
          top: 0,
          left: window.innerWidth,
          behavior: 'smooth',
        });
      }
    };

    window.addEventListener('mousemove', movePointer);
    return () => {
      window.removeEventListener('mousemove', movePointer);
    };
  }, []);

  const [meshes, setMeshes] = useState([
    { id: 1, position: [0, 3, -5] },
    { id: 2, position: [0, 4, -5] },
    { id: 3, position: [0, 5, -5] },
    { id: 4, position: [0, 6, -5] },
  ]);

  const isPositionValid = (newPosition, existingPositions, minDistance = 1) => {
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
        Math.random() * 7 - 7, // x: -5 ~ 5
        Math.random() * 7 - 7, // y: -5 ~ 5
        // -5, // z 고정
        Math.random() * 3 - 3, // y: -5 ~ 5
      ];
      attempts++;
      if (attempts > 100) break;
    } while (!isPositionValid(newPosition, existingPositions));
    return newPosition;
  };

  const removeMesh = (id) => {
    setMeshes((prevMeshes) => {
      const filteredMeshes = prevMeshes.filter((mesh) => mesh.id !== id); // 제거시킴
      setScore(score + 500);
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
  useEffect(() => {
    console.log(tagetClick, '// ', backGroundClick);
  }, [tagetClick, backGroundClick]);
  return (
    <>
      <Crosshair />
      <Scorebar score={score} time={timer} rate={rate}></Scorebar>
      <Canvas style={{ height: '100vh', width: '100vw' }}>
        <Background
          onBackgroundClick={() => setBackGroundClick(backGroundClick + 1)}
        ></Background>
        <directionalLight
          position={[5, 10, 5]} // 빛의 위치
          intensity={1.5} // 빛의 강도
          castShadow // 그림자 활성화
          shadow-mapSize-width={1024} // 그림자 해상도
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10} // 그림자 범위
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {meshes.map((mesh) => (
          <ClickableMesh
            color={userColor}
            position={mesh.position}
            key={mesh.id}
            onRemove={() => {
              removeMesh(mesh.id);
              setTargetClick(tagetClick + 1);
            }}
          />
        ))}
        <Controls></Controls>
      </Canvas>
    </>
  );
}

export default App;
