import { set } from "mongoose";
import { create } from "zustand";

// Zustand 스토어 정의
export interface SelectDateState {
  selectDate: Date; // 선택된 날짜를 저장하는 상태
  setSelectDate: (date: Date) => void; // 날짜 설정 함수
}

export const useSelectDateStore = create<SelectDateState>((set) => ({
  selectDate: new Date(), // 초기값을 null로 설정
  setSelectDate: (date) => set({ selectDate: date }),
}));

export interface EditState {
  isEdited: boolean;
  setIsEdited: (date: boolean) => void;
}

export const useEditStatusStore = create<EditState>((set) => ({
  isEdited: false,
  setIsEdited: (status) => set({ isEdited: status }),
}));
