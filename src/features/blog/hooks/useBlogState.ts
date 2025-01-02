import { useState } from "react";
import { IBlog } from "@/model/Blog";
import { useEditStatusStore } from "@/store/blog/editStatusStore";
import { useCurrentPostStore } from "@/store/blog/currentPostStore";

export function useBlogState() {
  const [posts, setPosts] = useState<Pick<IBlog, "content" | "author">>({
    content: "",
    author: "",
  });

  const isEdited = useEditStatusStore((state) => state.isEdited);
  const currentPost = useCurrentPostStore((state) => state.currentPost);

  return {
    posts,
    setPosts,
    isEdited,
    currentPost,
  };
}
