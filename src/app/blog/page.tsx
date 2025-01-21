"use client";

import { useSelectDateStore } from "@/store/blog/selectDateStore";
import { DateView } from "../../features/blog/components/DateView";
import { BlogFooter } from "../../features/blog/components/BlogFooter";
import BlogContent from "../../features/blog/components/BlogContent";
import { useBlogController } from "@/features/blog/controllers/blogController";
import { useState } from "react";

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
  const [currentSlide, setCurrentSlide] = useState(0);

  const contentSections =
    currentPost?.content
      .split(/(?=\d+\.)/)
      .filter((section) => section.trim() && section !== "<p>") || [];

  return (
    <div className="flex flex-col content-between h-full">
      <DateView
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        handleSave={() => selectDate && handleSave(selectDate)}
        handleDelete={handleDelete}
      />
      <BlogContent
        isEdited={isEdited}
        posts={posts}
        currentPost={currentPost}
        handleContentChange={handleContentChange}
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
      />

      <BlogFooter
        handleLikey={handleLikey}
        currentSlide={currentSlide}
        totalSlides={contentSections.length}
        onSlideChange={setCurrentSlide}
      />
    </div>
  );
}
