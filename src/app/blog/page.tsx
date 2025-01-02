"use client";

import { useBlogController } from "./blogController";
import { useSelectDateStore } from "@/store/blog/selectDateStore";
import { DateView } from "./components/DateView";
import { BlogFooter } from "./components/BlogFooter";
import BlogContent from "./components/BlogContent";
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
        // @ts-ignore, 추후 post의 타입 수정
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
