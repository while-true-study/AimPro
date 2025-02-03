import { create } from 'zustand';

export const useGameStore = create((set) => ({
  state: 'wating', // 게임 상태
  result: '', // 결과 정보
  gamerecord: [], // 게임 전적
  scorebarviewing: false,
  timer: 60,
  setReacord: (newResult) => {
    // 전적 넣기
    set((prev) => ({
      gamerecord: [...prev.gamerecord, newResult],
    }));
  },
  setState: (newState) => {
    // 시작
    set({ state: newState, scorebarviewing: true });
  },
  setTimer: (newTimer) => {
    set({ timer: newTimer });
  },
  setEnd: (newEnd) => {
    set({ end: newEnd });
  },
}));

export const useOptionStore = create((set) => ({
  crosshair: 'dot',
  MeshX: Math.random() * 5 - 2.5,
  MeshY: Math.random() * 5 - 2.5,
  MeshZ: Math.random() * 2 - 5,
}));

export const useConTrolStore = create((set) => ({
  isLocked: false,
  toggleLocked: () => set((state) => ({ isLocked: !state.isLocked })),
  setIsLocked: (newLocked) => set((state) => ({ isLocked: newLocked })),
}));
