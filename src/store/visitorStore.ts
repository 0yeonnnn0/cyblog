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

const VISITOR_KEY = "last_visit_date";

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
      // 오늘 날짜 확인
      const today = new Date().toDateString();
      // 마지막 방문 날짜 확인
      const lastVisit = sessionStorage.getItem(VISITOR_KEY);

      // 오늘 처음 방문한 경우에만 카운트 증가
      if (lastVisit !== today) {
        set({ isLoading: true });
        const { count } = await incrementVisitorCount();
        set({ count, isLoading: false });
        // 방문 날짜 저장
        sessionStorage.setItem(VISITOR_KEY, today);
      } else {
        // 이미 방문한 경우 카운트만 가져오기
        const { count } = await getVisitorCount();
        set({ count });
      }
    } catch (error) {
      set({ error: "방문자 수 업데이트 실패", isLoading: false });
    }
  },
}));
