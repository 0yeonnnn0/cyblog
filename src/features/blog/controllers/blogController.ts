import { useState, useEffect } from "react";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPost,
  likeBlogPost,
} from "@/features/blog/models/blogModel";
import { useUserStore } from "@/store/userStore";
import { useEditStatusStore } from "@/store/blog/editStatusStore";
import {
  CurrentPost,
  useCurrentPostStore,
} from "@/store/blog/currentPostStore";
import { useSelectDateStore } from "@/store/blog/selectDateStore";

interface Posts {
  content: string;
  author: string;
  likey?: number;
}

export function useBlogState() {
  const [posts, setPosts] = useState({
    content: "",
    author: "",
  });

  const isEdited = useEditStatusStore((state) => state.isEdited);
  const setIsEdited = useEditStatusStore((state) => state.setIsEdited);

  const clearCurrentPost = useCurrentPostStore(
    (state) => state.clearCurrentPost
  );
  const currentPost = useCurrentPostStore((state) => state.currentPost);
  const setCurrentPost = useCurrentPostStore(
    (state) => state.setCurrentPost
  ) as (post: CurrentPost | null) => void;

  return {
    posts,
    setPosts,
    isEdited,
    setIsEdited,
    currentPost,
    setCurrentPost,
    clearCurrentPost,
  };
}

export function useBlogActions(
  posts: Posts,
  setIsEdited: (value: boolean) => void
) {
  const user = useUserStore((state) => state.user);
  const selectDate = useSelectDateStore((state) => state.selectDate);

  const handleLikey = async (postId: string) => {
    await likeBlogPost(postId);
    window.location.reload();
  };

  const handleSave = async (queryDate: string) => {
    if (!queryDate) return;

    const blogData = {
      author: user?.username || "Guest",
      content: posts.content,
    };

    try {
      await createBlogPost(blogData, queryDate);
      setIsEdited(false);
      window.location.reload();
    } catch (error) {
      console.error("Error saving blog post:", error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("정말로 이 게시물을 삭제하시겠습니까?");
    if (confirmed) {
      await deleteBlogPost(selectDate);
      window.location.reload();
    }
  };

  return {
    handleLikey,
    handleSave,
    handleDelete,
  };
}

export function useBlogData(
  setPosts: React.Dispatch<React.SetStateAction<Posts>>,
  setCurrentPost: (post: CurrentPost | null) => void,
  clearCurrentPost: () => void
) {
  const selectDate = useSelectDateStore((state) => state.selectDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlogPost(selectDate);
        if (data) {
          setPosts({
            content: data.content,
            author: data.author,
          });
          setCurrentPost({
            content: data.content,
            author: data.author,
            _id: data._id as string,
            likey: data.likey,
          });
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
  }, [selectDate]);
}

export function useBlogController() {
  const {
    posts,
    setPosts,
    isEdited,
    setIsEdited,
    currentPost,
    setCurrentPost,
    clearCurrentPost,
  } = useBlogState();

  const { handleLikey, handleSave, handleDelete } = useBlogActions(
    posts,
    setIsEdited
  );

  useBlogData(setPosts, setCurrentPost, clearCurrentPost);

  const handleEdit = () => setIsEdited(true);

  const handleCancel = () => {
    setIsEdited(false);
    setPosts((prev) => ({
      ...prev,
      content: currentPost?.content || "",
    }));
  };

  const handleContentChange = (value: string) => {
    setPosts((prev) => ({ ...prev, content: value }));
  };

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
