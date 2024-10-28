"use client"; // Next.js 클라이언트 컴포넌트로 지정

import "@/app/globals.css";
import { BlogFooter, DateView } from "./blogView";
import { TextEditor } from "@/components/TextEditor";
import { useEditStatusStore } from "@/store/blogStore";
import { useState } from "react";
import { createBlogPost } from "./blogModel";

const newBlogData = {
  content: "This is the content of the blog post.", // 필수 필드
  author: "Author Name", // 필수 필드
  views: 10, // 선택 필드 (입력하지 않으면 기본값 0)
  likey: 5, // 선택 필드 (입력하지 않으면 기본값 0)
};

export default function BlogPage() {
  const [value, setValue] = useState("");

  const isEdited = useEditStatusStore((state) => state.isEdited);
  const onSaveClick = () => {
    createBlogPost(newBlogData)
      .then((savedBlog) => {
        console.log("Blog post created successfully:", savedBlog);
      })
      .catch((error) => {
        console.error("Error creating blog post:", error);
      });
  };
  return (
    <div className="flex flex-col content-between min-h-full">
      <DateView />

      <div className="blog-content p-2 flex-1 h-full font-mono">
        {isEdited ? (
          <TextEditor value={value} setValue={setValue} />
        ) : (
          <p>일기 내용이 들어갈 자리입니다.</p>
        )}
      </div>
      <BlogFooter onSaveClick={onSaveClick} />
    </div>
  );
}
