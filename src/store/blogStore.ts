import { IBlog } from "@/model/Blog";
import { create } from "zustand";

// 특정 월의 게시글이 얼마나 있는지 확인용, 백엔드에서 가져올 예정
interface BlogWrittenDateState {
  writtenDate: Date[];
  setWrittenDate: (date: Date[]) => void;
}

export const useBlogWrittenDateStore = create<BlogWrittenDateState>((set) => ({
  writtenDate: [],
  setWrittenDate: (date) => set({ writtenDate: date }),
}));

// 선택한 날짜 -> 특정 날짜의 게시글 보기용
export interface SelectDateState {
  selectDate: Date;
  setSelectDate: (date: Date) => void;
}

export const useSelectDateStore = create<SelectDateState>((set) => ({
  selectDate: new Date(), // 초기값을 null로 설정
  setSelectDate: (date) => set({ selectDate: date }),
}));

// 게시글 수정 상태 저장용 Store
export interface EditState {
  isEdited: boolean;
  setIsEdited: (date: boolean) => void;
}

export const useEditStatusStore = create<EditState>((set) => ({
  isEdited: false,
  setIsEdited: (status) => set({ isEdited: status }),
}));

// 단일 게시글 저장용 Store
interface BlogStore {
  currentPost: IBlog | null;
  setCurrentPost: (post: IBlog) => void;
  clearCurrentPost: () => void;
}

export const useBlogStore = create<BlogStore>((set) => ({
  currentPost: null,
  setCurrentPost: (post) => set({ currentPost: post }), // 게시물 업데이트
  clearCurrentPost: () => set({ currentPost: null }), // 게시물 초기화
}));
