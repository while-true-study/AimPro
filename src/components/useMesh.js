import { useState, useEffect } from 'react';
import { generateRandomPosition } from '../utils/isPositionValid';

export const useMeshes = (MeshCount, stating, timer, setScore) => {
  const [meshes, setMeshes] = useState([]);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    const newMeshes = Array.from({ length: MeshCount }, (_, id) => ({
      id: id + 1,
      position: generateRandomPosition([]),
    }));
    setMeshes(newMeshes);
  }, [MeshCount, stating]);

  const removeMesh = (id) => {
    if (removing) return;
    setRemoving(true);

    setMeshes((prevMeshes) => {
      const filteredMeshes = prevMeshes.filter((mesh) => mesh.id !== id);
      const newId = Math.max(...prevMeshes.map((mesh) => mesh.id)) + 1;
      const newPosition = generateRandomPosition(
        filteredMeshes.map((mesh) => mesh.position),
      );
      const newMesh = { id: newId, position: newPosition };

      return [...filteredMeshes, newMesh];
    });

    setTimeout(() => {
      setScore(timer >= 20 ? 500 : 1000);
      setRemoving(false);
    }, 100);
  };

  return { meshes, removeMesh };
};
