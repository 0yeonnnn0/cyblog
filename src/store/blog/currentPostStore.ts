import { create } from "zustand";

export interface CurrentPost {
  content: string;
  author: string;
  likey: number;
  _id?: string;
}

interface CurrentPostStore {
  currentPost: CurrentPost | null;
  setCurrentPost: (post: CurrentPost) => void;
  clearCurrentPost: () => void;
}

export const useCurrentPostStore = create<CurrentPostStore>((set) => ({
  currentPost: null,
  setCurrentPost: (post) => set({ currentPost: post }),
  clearCurrentPost: () => set({ currentPost: null }),
}));
