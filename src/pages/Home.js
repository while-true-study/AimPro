import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Raycaster, Vector2 } from 'three';
import { PointerLockControls } from '@react-three/drei';
import Background from '../components/Background';
import Scorebar from '../components/ScoreBar';

function Crosshair() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '5px',
        height: '5px',
        backgroundColor: 'red',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        zIndex: 100,
      }}
    />
  );
}
// function ScoreBar({ score }) {
//   return (
//     <div>
//       <div
//         style={{
//           position: 'absolute',
//           top: '5%',
//           left: '50%',
//           width: '5px',
//           height: '5px',
//           backgroundColor: 'red',
//           transform: 'translate(-50%, -50%)',
//           borderRadius: '50%',
//           zIndex: 100,
//         }}
//       >
//         {score}
//       </div>
//     </div>
//   );
// }
function ClickableMesh({ onRemove, position }) {
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
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

function FirstPersonControls() {
  const { camera, scene } = useThree();
  const raycaster = new Raycaster();
  const mouse = new Vector2();

  useEffect(() => {
    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        if (clickedObject.userData && clickedObject.userData.onClick) {
          clickedObject.userData.onClick(); // userData의 onClick 호출
        }
      }
    };

    window.addEventListener('click', onMouseClick);
    return () => window.removeEventListener('click', onMouseClick);
  }, [camera, raycaster, mouse, scene]);

  return <PointerLockControls />;
}

function App() {
  const [meshes, setMeshes] = useState([
    { id: 1, position: [0, 1, -5] },
    { id: 2, position: [0, 1, -5] },
    { id: 3, position: [0, 1, -5] },
    { id: 4, position: [0, 1, -5] },
  ]);

  // 충돌 여부 확인 함수
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
        Math.random() * 5 - 5, // x: -5 ~ 5
        Math.random() * 5 - 5, // y: -5 ~ 5
        -5, // z 고정
      ];
      attempts++;
      if (attempts > 100) break; // 안전장치: 너무 많은 시도 시 중단
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
  const createMesh = () => {};
  const [score, setScore] = useState(0);
  return (
    <>
      <Crosshair />
      <Scorebar score={score}></Scorebar>
      <Canvas>
        <Background
          onBackgroundClick={() => console.log('Miss Click')}
        ></Background>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {meshes.map((mesh) => (
          <ClickableMesh
            position={mesh.position}
            key={mesh.id}
            onRemove={() => {
              removeMesh(mesh.id);
              createMesh();
            }}
          />
        ))}
        <FirstPersonControls />
      </Canvas>
    </>
  );
}

export default App;
