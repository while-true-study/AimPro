export const isPositionValid = (
  newPosition,
  existingPositions,
  minDistance = 1,
) => {
  for (const pos of existingPositions) {
    const distance = Math.sqrt(
      Math.pow(newPosition[0] - pos[0], 2) +
        Math.pow(newPosition[1] - pos[1], 2),
    );
    if (distance < minDistance) return false; // 충돌 발생
  }
  return true; // 충돌 없음
};

export const generateRandomPosition = (existingPositions) => {
  let newPosition;
  let attempts = 0;
  do {
    newPosition = [
      Math.random() * 5 - 2.5, // x: -5 ~ 5
      Math.random() * 5 - 2.5, // y: -5 ~ 5
      Math.random() * 2 - 5, // z: -5 ~ 5
    ];
    attempts++;
    if (attempts > 100) break;
  } while (!isPositionValid(newPosition, existingPositions));
  return newPosition;
};
