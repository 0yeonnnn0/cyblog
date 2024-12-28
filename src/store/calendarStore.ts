import { create } from "zustand";

interface CalendarState {
  postDates: Record<string, string[]>;
  currentMonth: string;
  selectDate: Date;
  setCurrentMonth: (month: string) => void;
  setSelectDate: (date: Date) => void;
  setPostDates: (month: string, dates: string[]) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  postDates: {},
  currentMonth: new Date().toISOString().slice(0, 7),
  selectDate: new Date(),
  setCurrentMonth: (month) => set({ currentMonth: month }),
  setSelectDate: (date) => set({ selectDate: date }),
  setPostDates: (month, dates) =>
    set((state) => ({
      postDates: { ...state.postDates, [month]: dates },
    })),
}));
