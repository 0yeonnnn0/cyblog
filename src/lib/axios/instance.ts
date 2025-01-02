import axios from "axios";

export const baseApi = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// 공통 인터셉터 설정
baseApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API 에러:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
