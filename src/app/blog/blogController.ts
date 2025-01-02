import { useState, useEffect } from "react";
import {
  useBlogStore,
  useEditStatusStore,
  useSelectDateStore,
} from "@/store/blogStore";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPost,
  likeBlogPost,
} from "./blogModel";
import { useUserStore } from "@/store/userStore";

export function useBlogState() {
  const [posts, setPosts] = useState({ content: "", author: "" });

  const isEdited = useEditStatusStore((state) => state.isEdited);
  const setIsEdited = useEditStatusStore((state) => state.setIsEdited);

  const clearCurrentPost = useBlogStore((state) => state.clearCurrentPost);
  const currentPost = useBlogStore((state) => state.currentPost);
  const setCurrentPost = useBlogStore((state) => state.setCurrentPost);

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

export function useBlogActions(posts: any, setIsEdited: any) {
  const user = useUserStore((state) => state.user);
  const { selectDate } = useSelectDateStore();

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
  setPosts: any,
  setCurrentPost: any,
  clearCurrentPost: any
) {
  const { selectDate } = useSelectDateStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlogPost(selectDate);
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

// export function useBlogController() {
//   const [posts, setPosts] = useState({ content: "", author: "" });
//   const searchParams = useSearchParams();
//   const date = searchParams.get("date") as string;

//   const user = useUserStore((state) => state.user);

//   const isEdited = useEditStatusStore((state) => state.isEdited);
//   const setIsEdited = useEditStatusStore((state) => state.setIsEdited);

//   const { selectDate } = useSelectDateStore();

//   const clearCurrentPost = useBlogStore((state) => state.clearCurrentPost);
//   const currentPost = useBlogStore((state) => state.currentPost);
//   const setCurrentPost = useBlogStore((state) => state.setCurrentPost);

//   const handleLikey = () => {
//     likeBlogPost(currentPost?._id as string);
//     window.location.reload();
//   };

//   const handleEdit = () => {
//     setIsEdited(true);
//   };

//   const handleCancel = () => {
//     setIsEdited(false);
//     setPosts((prevPosts) => ({
//       ...prevPosts, // 기존의 posts 상태 유지
//       content: currentPost?.content || "",
//     }));
//   };

//   const handleSave = async (queryDate: string) => {
//     console.log("queryDate", queryDate);

//     if (!queryDate) return;

//     const blogData = {
//       author: user?.username || "Guest",
//       content: posts.content,
//     };

//     console.log("selectedDateStr", queryDate);

//     try {
//       await createBlogPost(
//         {
//           ...blogData,
//         },
//         queryDate
//       );

//       setIsEdited(false);
//       window.location.reload();
//     } catch (error) {
//       console.error("Error saving blog post:", error);
//     }
//   };

//   const handleDelete = async () => {
//     const confirmed = window.confirm("정말로 이 게시물을 삭제하시겠습니까?");
//     if (confirmed) {
//       await deleteBlogPost(selectDate);
//       console.log("Blog post deleted.");
//       window.location.reload();
//     }
//   };

//   const handleContentChange = (value: string) => {
//     setPosts((prev) => ({ ...prev, content: value }));
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getBlogPost(selectDate);

//         if (data) {
//           setPosts({
//             content: data.content,
//             author: data.author,
//           });
//           setCurrentPost(data);
//         } else {
//           setPosts({ content: "", author: "" });
//           clearCurrentPost();
//         }
//       } catch (error) {
//         console.error("Failed to fetch blog post:", error);
//         setPosts({ content: "", author: "" });
//         clearCurrentPost();
//       }
//     };

//     fetchData();
//   }, [selectDate]);

//   return {
//     posts,
//     currentPost,
//     isEdited,
//     handleEdit,
//     handleSave,
//     handleContentChange,
//     handleDelete,
//     handleCancel,
//     handleLikey,
//   };
// }
