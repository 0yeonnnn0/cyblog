import { create } from "zustand";

interface CalendarState {
  postDates: Record<string, string[]>;
  currentYear: number;
  currentMonth: number;
  setCurrentMonth: (month: number) => void;
  setPostDates: (month: string, dates: string[]) => void;
  setCurrentYear: (year: number) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  postDates: {},
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth(),
  setCurrentMonth: (month) => set({ currentMonth: month }),
  setPostDates: (month, dates) =>
    set((state) => ({
      postDates: { ...state.postDates, [month]: dates },
    })),
  setCurrentYear: (year) => set({ currentYear: year }),
}));
