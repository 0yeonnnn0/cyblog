"use client";

import { useState, useEffect, useMemo } from "react";
import { useSelectDateStore } from "@/store/blog/selectDateStore";
import { useBlogPost } from "../hooks/useBlogPost";
import { DateView } from "./DateView";
import { BlogContent } from "./BlogContent";
import { BlogFooter } from "./BlogFooter";
import { useEditStatusStore } from "@/store/blog/editStatusStore";

export default function BlogPageClient() {
  const selectDate = useSelectDateStore((state) => state.selectDate);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [content, setContent] = useState("");
  const { currentPost, mutations } = useBlogPost(selectDate);
  // 상태 관리 - 사용, zustand는 상태를 구독하는 것이 더 효과적임,
  // 상태 변경이 발생했을 때 필요한 컴포넌트만 리렌더링하기 때문
  // const { isEdited, setIsEdited } = useEditStatusStore();

  // 상태 관리 - 구독
  const isEdited = useEditStatusStore((state) => state.isEdited);
  const setIsEdited = useEditStatusStore((state) => state.setIsEdited);

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
