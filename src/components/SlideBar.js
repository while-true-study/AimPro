import { useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const SliderBar = () => {
  //   const [value, setValue] = useState(5);
  //   const [dragging, setDragging] = useState(false);
  //   const { viewport } = useThree();
  //   const viewportWidth = viewport?.width ?? 10; // 🔥 오류 방지: 기본값 설정
  //   const handleDrag = (event) => {
  //     if (!dragging) return;
  //     const deltaX = event.movementX / viewportWidth; // 🔥 여기서 오류 방지됨
  //     const newValue = Math.max(1, Math.min(10, value + deltaX * 10));
  //     setValue(newValue);
  //   };
  //   return (
  //     <group position={[0, -1, 0]} onPointerMove={handleDrag}>
  //       <mesh position={[0, 0, 0]}>
  //         <planeGeometry args={[4, 0.2]} />
  //         <meshBasicMaterial color="gray" />
  //       </mesh>
  //       <mesh
  //         position={[((value - 1) / 9) * 4 - 2, 0, 0]}
  //         onPointerDown={() => setDragging(true)}
  //         onPointerUp={() => setDragging(false)}
  //       >
  //         <circleGeometry args={[0.15, 32]} />
  //         <meshBasicMaterial color="red" />
  //       </mesh>
  //       <Text position={[0, 0.5, 0]} fontSize={0.3} color="white">
  //         값: {value.toFixed(1)}
  //       </Text>
  //     </group>
  //   );
};

export default SliderBar;
