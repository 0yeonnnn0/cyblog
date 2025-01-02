import { baseApi } from "@/lib/axios/instance";

// baseURL을 설정하는 인터셉터 추가
baseApi.interceptors.request.use((config) => {
  config.url = `/api/blog${config.url}`;
  return config;
});

export default baseApi;
