import { create } from "zustand";
import {
  getVisitorCount,
  incrementVisitorCount,
} from "@/features/home/api/visitorCounterApi";

interface VisitorState {
  count: number;
  isLoading: boolean;
  error: string | null;
  initVisitorCount: () => Promise<void>;
  updateVisitorCount: () => Promise<void>;
}

export const useVisitorStore = create<VisitorState>((set) => ({
  count: 0,
  isLoading: false,
  error: null,

  initVisitorCount: async () => {
    try {
      set({ isLoading: true });
      const { count } = await getVisitorCount();
      set({ count, isLoading: false });
    } catch (error) {
      set({ error: "방문자 수 조회 실패", isLoading: false });
    }
  },

  updateVisitorCount: async () => {
    try {
      set({ isLoading: true });
      const { count } = await incrementVisitorCount();
      set({ count, isLoading: false });
    } catch (error) {
      set({ error: "방문자 수 업데이트 실패", isLoading: false });
    }
  },
}));
