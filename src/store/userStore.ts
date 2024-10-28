import { create } from "zustand";

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
const initialUser: User = {
  uid: "kkkk", // 기본값: 빈 문자열 (로그인 전이므로 ID가 없음)
  username: "Guest", // 기본값: "Guest" (또는 비어 있을 수 있음)
  email: "ang@nav.com", // 기본값: null (로그인 전이므로 이메일이 없음)
  isAdmin: true, // 기본값: false (관리자가 아닌 일반 사용자로 설정)
};

//로그인 후 사용자 정보를 저장하는 상태
export const useUserStore = create<UserState>((set) => ({
  user: initialUser,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }), //로그아웃시 사용
}));
