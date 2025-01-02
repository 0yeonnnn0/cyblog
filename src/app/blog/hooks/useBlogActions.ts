import { useUserStore } from "@/store/userStore";
import { blogService } from "../_lib/services/blogService";
import { useEditStatusStore } from "@/store/blog/editStatusStore";
import { useSelectDateStore } from "@/store/blog/selectDateStore";
import { IBlog } from "@/model/Blog";

export function useBlogActions(
  posts: Pick<IBlog, "content" | "author">,
  setPosts: React.Dispatch<
    React.SetStateAction<Pick<IBlog, "content" | "author">>
  >,
  currentPost: IBlog | null
) {
  const user = useUserStore((state) => state.user);
  const setIsEdited = useEditStatusStore((state) => state.setIsEdited);
  const selectDate = useSelectDateStore((state) => state.selectDate);

  const handleLikey = async (postId: string) => {
    await blogService.likeBlogPost(postId);
    window.location.reload();
  };

  const handleSave = async (queryDate: string) => {
    if (!queryDate) return;

    try {
      await blogService.createBlogPost(
        {
          author: user?.username || "Guest",
          content: posts.content,
        },
        queryDate
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
      await blogService.deleteBlogPost(selectDate);
      window.location.reload();
    }
  };

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
    handleLikey,
    handleSave,
    handleEdit,
    handleDelete,
    handleCancel,
    handleContentChange,
  };
}
