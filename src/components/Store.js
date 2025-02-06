import { create } from 'zustand';

export const useGameStore = create((set) => ({
  state: 'wating', // 상태
  result: '', // 결과
  gamerecord: [], // 전적
  scorebarviewing: false,
  timer: 60, // 게임시간
  score: 0, // 점수
  rate: 0, // 명중률
  setRate: (newRate) =>
    set((state) => ({
      rate: newRate,
    })),
  setRecording: (newRecording) =>
    set((state) => ({
      gamerecord: [...state.gamerecord, newRecording],
    })),
  setScore: (newScore) =>
    set((state) => ({
      score: state.score + newScore,
    })),
  setState: (newState) => {
    // 시작
    set((prev) => ({
      ...prev,
      state: newState,
      scorebarviewing: true,
      score: 0,
      rate: 0,
      timer: 60,
    }));
  },
  setScoreBarViewing: (newViewing) => {
    set({ scorebarviewing: newViewing });
  },
  setTimer: (newTimer) => {
    set({ timer: newTimer });
  },
  setEnd: (newEnd) => {
    set({ end: newEnd });
  },
}));

export const useOptionStore = create((set) => ({
  crosshair: 'dot', // 크로스 헤어
  MeshCount: 4, // 공 개수
  MeshColor: 'blue', // 공 색깔
  ColorChange: (newState) => {
    set((state) => ({
      MeshColor: newState,
    }));
  },
  ChangeCH: (newState) => {
    set((state) => ({
      crosshair: newState,
    }));
  },
  setMeshCount: (newState) => {
    set((state) => ({
      MeshCount: newState,
    }));
  },
}));
