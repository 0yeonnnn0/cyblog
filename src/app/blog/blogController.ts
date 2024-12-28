import { useState, useEffect } from "react";
import { useBlogStore, useEditStatusStore } from "@/store/blogStore";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPost,
  likeBlogPost,
} from "./blogModel";
import { useUserStore } from "@/store/userStore";
import { useSearchParams } from "next/navigation";
import { useCalendarStore } from "@/store/calendarStore";

export function useBlogController() {
  const [posts, setPosts] = useState({ content: "", author: "" });
  const searchParams = useSearchParams();
  const date = searchParams.get("date") as string;

  const user = useUserStore((state) => state.user);

  const isEdited = useEditStatusStore((state) => state.isEdited);
  const setIsEdited = useEditStatusStore((state) => state.setIsEdited);

  const selectedDate = useCalendarStore((state) => state.selectDate);

  const clearCurrentPost = useBlogStore((state) => state.clearCurrentPost);
  const currentPost = useBlogStore((state) => state.currentPost);
  const setCurrentPost = useBlogStore((state) => state.setCurrentPost);

  const handleLikey = () => {
    likeBlogPost(currentPost?._id as string);
    window.location.reload();
  };

  const handleEdit = () => {
    setIsEdited(true);
  };
  const handleCancel = () => {
    setIsEdited(false);
    setPosts((prevPosts) => ({
      ...prevPosts, // 기존의 posts 상태 유지
      content: currentPost?.content || "",
    }));
  };

  const handleSave = async () => {
    const selectedDateStr = selectedDate.toISOString().split("T")[0];

    const blogData = {
      author: user?.username || "Guest",
      content: posts.content,
    };

    console.log("selectedDateStr", selectedDateStr);

    try {
      await createBlogPost(
        {
          ...blogData,
        },
        selectedDateStr
      );

      setIsEdited(false);
      window.location.reload();
    } catch (error) {
      console.error("Error saving blog post:", error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("정말로 이 게시물을 삭제하시겠습니까?");
    if (confirmed) {
      await deleteBlogPost(selectedDate.toISOString().split("T")[0]);
      console.log("Blog post deleted.");
      window.location.reload();
    }
  };

  const handleContentChange = (value: string) => {
    setPosts((prev) => ({ ...prev, content: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlogPost(
          selectedDate.toISOString().split("T")[0]
        );

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
  }, [selectedDate]);

  return {
    posts,
    currentPost,
    isEdited,
    handleEdit,
    handleSave,
    handleContentChange,
    handleDelete,
    handleCancel,
    handleLikey,
  };
}
