import { TextEditor } from "@/components/TextEditor";
import { CurrentPost } from "@/store/blog/currentPostStore";
import BlogSlider from "./BlogSlider";
import BlogPagination from "./BlogPagination";
import { useState } from "react";

interface BlogContentProps {
  isEdited: boolean;
  posts: CurrentPost | null;
  currentPost: CurrentPost | null;
  handleContentChange: (content: string) => void;
}

function BlogContent({
  isEdited,
  posts,
  currentPost,
  handleContentChange,
}: BlogContentProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (isEdited) {
    return (
      <div className="p-2 flex-1 h-full font-mono">
        <TextEditor
          value={posts?.content || ""}
          setValue={handleContentChange}
        />
      </div>
    );
  }

  if (!currentPost) {
    return <p className="p-2">일기가 존재하지 않습니다.</p>;
  }

  const contentSections = currentPost.content
    .split(/(?=\d+\.)/)
    .filter((section) => section.trim() && section !== "<p>");

  return (
    <div className="relative flex-1 h-full group">
      <BlogSlider
        content={currentPost.content}
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
      />
      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-center bg-gradient-to-t from-white to-transparent">
        <BlogPagination
          currentSlide={currentSlide}
          totalSlides={contentSections.length}
          onSlideChange={setCurrentSlide}
        />
      </div>
    </div>
  );
}

export default BlogContent;
