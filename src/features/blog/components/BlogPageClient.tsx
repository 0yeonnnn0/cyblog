"use client";

import { useState, useEffect, useMemo } from "react";
import { useSelectDateStore } from "@/store/blog/selectDateStore";
import { useBlogPost } from "../hooks/useBlogPost";
import { DateView } from "./DateView";
import { BlogContent } from "./BlogContent";
import { BlogFooter } from "./BlogFooter";

export default function BlogPageClient() {
  const selectDate = useSelectDateStore((state) => state.selectDate);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isEdited, setIsEdited] = useState(false);
  const [content, setContent] = useState("");

  const { currentPost, mutations } = useBlogPost(selectDate);

  useEffect(() => {
    if (currentPost?.content) {
      setContent(currentPost.content);
    }
  }, [currentPost?.content]);

  const contentSections = useMemo(() => {
    return (
      currentPost?.content
        ?.split(/(?=\d+\.)/)
        .filter((section) => section.trim() && section !== "<p>") || []
    );
  }, [currentPost?.content]);

  const handleSave = async () => {
    try {
      await mutations.save.mutate(content);
      setIsEdited(false);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  return (
    <div className="flex flex-col content-between h-full">
      <DateView
        handleEdit={() => setIsEdited(true)}
        handleCancel={() => {
          setIsEdited(false);
          setContent(currentPost?.content || "");
        }}
        handleSave={handleSave}
        handleDelete={async () => {
          if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
            try {
              await mutations.delete.mutate();
            } catch (error) {
              console.error("Failed to delete:", error);
            }
          }
        }}
      />
      <BlogContent
        isEdited={isEdited}
        posts={{ content, author: currentPost?.author || "" }}
        currentPost={currentPost ?? null}
        handleContentChange={setContent}
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
      />
      <BlogFooter
        handleLikey={async () => {
          if (currentPost?._id) {
            try {
              await mutations.like.mutate(String(currentPost._id));
            } catch (error) {
              console.error("Failed to like:", error);
            }
          }
        }}
        currentSlide={currentSlide}
        totalSlides={contentSections.length}
        onSlideChange={setCurrentSlide}
      />
    </div>
  );
}
