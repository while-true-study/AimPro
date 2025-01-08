import React, { useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera, Raycaster, Vector2 } from 'three';
import './Home.css';
import { PointerLockControls } from 'three/examples/jsm/Addons.js';

function CameraLookAt({ mouseY, mouseX }) {
  const { camera } = useThree();

  useFrame(() => {
    // 마우스 Y 값을 기반으로 카메라의 바라보는 방향을 업데이트
    const targetY = mouseY * 1.1; // Y값 스케일 조정
    const targetX = mouseX * 1.1; // Y값 스케일 조정
    camera.lookAt(targetX * 5, targetY * -5, 0); // X: 0, Z: 0 고정, Y만 변경
  });

  return null;
}

function Raycastering() {
  const { camera, gl, scene } = useThree();
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  const [intersection, setIntersection] = useState(null);
}

const Home = () => {
  const [mouseY, setMouseY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const handlePointerMove = (event) => {
    const nY = (event.clientY / window.innerHeight) * 2 - 1;
    const nX = (event.clientX / window.innerWidth) * 2 - 1;
    setMouseX(nX);
    setMouseY(nY);
  };
  return (
    <div
      onPointerMove={handlePointerMove}
      style={{ width: '100%', height: '100%' }}
    >
      <div>
        <span id="center" class="material-symbols-outlined">
          add
        </span>
      </div>
      <Canvas antialias={false} style={{ width: '100%', height: '100%' }}>
        <CameraLookAt mouseY={mouseY} mouseX={mouseX} />
        <mesh
          onClick={() => {
            console.log('없어짐');
          }}
        >
          <sphereGeometry args={[0.1]}></sphereGeometry>
          <meshBasicMaterial color={'red'}></meshBasicMaterial>
        </mesh>
        <Raycastering></Raycastering>
      </Canvas>
    </div>
  );
};

export default Home;
