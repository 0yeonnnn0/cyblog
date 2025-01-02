import { create } from "zustand";
import { IBlog } from "@/model/Blog";

interface CurrentPostStore {
  currentPost: IBlog | null;
  setCurrentPost: (post: IBlog) => void;
  clearCurrentPost: () => void;
}

export const useCurrentPostStore = create<CurrentPostStore>((set) => ({
  currentPost: null,
  setCurrentPost: (post) => set({ currentPost: post }),
  clearCurrentPost: () => set({ currentPost: null }),
}));
