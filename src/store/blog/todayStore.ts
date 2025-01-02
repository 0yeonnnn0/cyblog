import { create } from "zustand";

interface TodayStore {
  today: string;
}

export const useTodayStore = create<TodayStore>(() => ({
  today: new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }),
}));
