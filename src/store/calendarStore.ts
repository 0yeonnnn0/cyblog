import { create } from "zustand";

interface CalendarState {
  postDates: Record<string, string[]>;
  currentYear: number;
  currentMonth: number;
  selectDate: Date;
  setCurrentMonth: (month: number) => void;
  setSelectDate: (date: Date) => void;
  setPostDates: (month: string, dates: string[]) => void;
  setCurrentYear: (year: number) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  postDates: {},
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth(),
  selectDate: new Date(),
  setCurrentMonth: (month) => set({ currentMonth: month }),
  setSelectDate: (date) => set({ selectDate: date }),
  setPostDates: (month, dates) =>
    set((state) => ({
      postDates: { ...state.postDates, [month]: dates },
    })),
  setCurrentYear: (year) => set({ currentYear: year }),
}));
