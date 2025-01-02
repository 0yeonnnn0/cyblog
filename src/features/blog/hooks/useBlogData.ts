import { useEffect, useState } from "react";
import { blogService } from "../../../features/blog/services/blogService";
import { useSelectDateStore } from "@/store/blog/selectDateStore";
import { useCurrentPostStore } from "@/store/blog/currentPostStore";
import { IBlog } from "@/model/Blog";

export function useBlogData() {
  const selectDate = useSelectDateStore((state) => state.selectDate);
  const setCurrentPost = useCurrentPostStore((state) => state.setCurrentPost);
  const clearCurrentPost = useCurrentPostStore(
    (state) => state.clearCurrentPost
  );
  const [posts, setPosts] = useState<Pick<IBlog, "content" | "author">>({
    content: "",
    author: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await blogService.getBlogPost(selectDate);
        if (data) {
          setPosts({
            content: data.content,
            author: data.author,
          });
          setCurrentPost(data);
        } else {
          setPosts({ content: "", author: "" });
          clearCurrentPost();
        }
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
        setPosts({ content: "", author: "" });
        clearCurrentPost();
      }
    };

    fetchData();
  }, [selectDate, setCurrentPost, clearCurrentPost]);

  return { posts, setPosts };
}
