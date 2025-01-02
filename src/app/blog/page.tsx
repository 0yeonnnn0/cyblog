"use client";

import { useSelectDateStore } from "@/store/blog/selectDateStore";
import { DateView } from "../../features/blog/components/DateView";
import { BlogFooter } from "../../features/blog/components/BlogFooter";
import BlogContent from "../../features/blog/components/BlogContent";
import { useBlogController } from "@/features/blog/controllers/blogController";

export default function BlogPage() {
  const {
    posts,
    currentPost,
    isEdited,
    handleEdit,
    handleSave,
    handleContentChange,
    handleDelete,
    handleCancel,
    handleLikey,
  } = useBlogController();
  const selectDate = useSelectDateStore((state) => state.selectDate);

  return (
    <div className="flex flex-col content-between min-h-full">
      <DateView />
      <BlogContent
        isEdited={isEdited}
        posts={posts}
        currentPost={currentPost}
        handleContentChange={handleContentChange}
      />

      <BlogFooter
        handleLikey={handleLikey}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        handleSave={() => selectDate && handleSave(selectDate)}
        handleDelete={handleDelete}
      />
    </div>
  );
}
