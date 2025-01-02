//  Axios 인스턴스 설정

import { baseApi } from "@/lib/axios/instance";

const blogApi = baseApi;
blogApi.defaults.baseURL = "/api/blog";

export default blogApi;
