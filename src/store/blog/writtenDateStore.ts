import { create } from "zustand";

// 특정 월의 게시글이 얼마나 있는지 확인용, 백엔드에서 가져올 예정
interface WrittenDateState {
  writtenDate: Date[];
  setWrittenDate: (date: Date[]) => void;
}

export const useWrittenDateStore = create<WrittenDateState>((set) => ({
  writtenDate: [],
  setWrittenDate: (date) => set({ writtenDate: date }),
}));
