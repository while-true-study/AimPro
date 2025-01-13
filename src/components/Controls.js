import React, { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Raycaster, Vector2 } from 'three';
import { PointerLockControls } from '@react-three/drei';

const Controls = () => {
  const { camera, scene } = useThree();
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const onMouseClick = (event) => {
      if (!isLocked) return; // 포인터 잠금 상태가 아니면 처리하지 않음
      event.preventDefault(); // 기본 마우스 클릭 동작 차단

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        if (clickedObject.userData?.onClick) {
          clickedObject.userData.onClick(); // userData에 있는 onClick 호출
        }
      }
    };

    const onLockChange = () => {
      setIsLocked(document.pointerLockElement === document.body); // 포인터 잠금 상태 확인
    };

    document.addEventListener('pointerlockchange', onLockChange);
    window.addEventListener('click', onMouseClick);

    return () => {
      document.removeEventListener('pointerlockchange', onLockChange);
      window.removeEventListener('click', onMouseClick);
    };
  }, [camera, scene, raycaster, mouse, isLocked]);

  return <PointerLockControls />;
};

export default Controls;
