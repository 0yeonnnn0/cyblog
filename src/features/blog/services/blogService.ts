// 비즈니스 로직import blogApi from '../api/blogApi';
import { IBlog } from "@/model/Blog";
import blogApi from "../api/blogAPI";

export const blogService = {
  async getBlogPost(date: string): Promise<IBlog | null> {
    try {
      const { data } = await blogApi.get(`?post=${date}`);
      return data;
    } catch (error) {
      console.error("블로그 포스트 조회 실패:", error);
      return null;
    }
  },

  async createBlogPost(
    data: Partial<IBlog>,
    localDate: string
  ): Promise<IBlog> {
    try {
      const { data: newBlog } = await blogApi.post("", {
        ...data,
        date: localDate,
      });
      return newBlog;
    } catch (error) {
      throw new Error("블로그 포스트 생성 실패");
    }
  },

  async deleteBlogPost(date: string): Promise<void> {
    try {
      await blogApi.delete(`?date=${date}`);
      console.log("블로그 포스트가 성공적으로 삭제되었습니다");
    } catch (error) {
      console.error("블로그 포스트 삭제 실패:", error);
    }
  },

  async likeBlogPost(id: string): Promise<void> {
    try {
      await blogApi.post("/like", { id });
    } catch (error) {
      console.error("블로그 포스트 좋아요 실패:", error);
    }
  },
};
