import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  uid: string; // Firebase UID
  username: string;
  email: string | null;
  isAdmin: boolean;
}
export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
}

//로그인 후 사용자 정보를 저장하는 상태
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      resetUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
