import React, { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Raycaster, Vector2 } from 'three';
import { PointerLockControls } from '@react-three/drei';
import { useConTrolStore } from './Store';

const Controls = () => {
  // const { camera, scene } = useThree();
  // const raycaster = new Raycaster();
  // const mouse = new Vector2(0, 0);
  // const Locked = useConTrolStore((state) => state.isLocked);
  // const setIsLocked = useConTrolStore((state) => state.setIsLocked);

  // useEffect(() => {
  //   const onCanvasClick = async () => {
  //     if (!document.pointerLockElement) {
  //       await document.body.requestPointerLock(); // Pointer Lock 요청
  //     }
  //   };

  //   const onMouseClick = (event) => {
  //     if (!Locked) return; // 포인터 잠금 상태가 아니면 처리하지 않음
  //     event.preventDefault(); // 기본 마우스 클릭 동작 차단

  //     raycaster.setFromCamera(mouse, camera);

  //     const intersects = raycaster.intersectObjects(scene.children);
  //     if (intersects.length > 0) {
  //       const clickedObject = intersects[0].object;
  //       if (clickedObject.userData?.onClick) {
  //         clickedObject.userData.onClick(); // userData에 있는 onClick 호출
  //       }
  //     }
  //   };

  //   // Pointer Lock 상태 변경 이벤트 리스너 추가
  //   document.addEventListener('pointerlockchange', onLockChange);
  //   window.addEventListener('click', onMouseClick);

  //   return () => {
  //     document.removeEventListener('pointerlockchange', onLockChange);
  //     window.removeEventListener('click', onMouseClick);
  //   };
  // }, [camera, scene, raycaster, mouse, Locked, setIsLocked]);

  return <PointerLockControls />;
};

export default Controls;
