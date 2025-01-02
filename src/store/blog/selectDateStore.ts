import { create } from "zustand";

// 선택한 날짜 -> 특정 날짜의 게시글 보기용
export interface SelectDateState {
  selectDate: string;
  setSelectDate: (date: string) => void;
}

export const useSelectDateStore = create<SelectDateState>((set) => ({
  selectDate: new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }), // 초기값은 오늘 날짜
  setSelectDate: (date) => set({ selectDate: date }),
}));
