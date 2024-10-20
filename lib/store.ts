import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// 상태 타입 정의
interface AuthState {
  isLoggedIn: boolean;
}

// 초기 상태 정의
const initialState: AuthState = {
  isLoggedIn: false,
};

// createSlice를 사용하여 슬라이스 생성
const isLoggedInSlice = createSlice({
  name: "isLoggedIn",
  initialState,
  reducers: {
    logIn(state) {
      state.isLoggedIn = true;
    },
    logOut(state) {
      state.isLoggedIn = false;
    },
  },
});

// 액션 및 리듀서 내보내기
export const { logIn, logOut } = isLoggedInSlice.actions;

// Redux 스토어 생성
const store = configureStore({
  reducer: {
    isLoggedIn: isLoggedInSlice.reducer,
  },
});

// 스토어 타입 및 타입 추론
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
