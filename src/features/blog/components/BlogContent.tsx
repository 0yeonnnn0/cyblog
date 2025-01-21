import { TextEditor } from "@/components/TextEditor";
import { CurrentPost } from "@/store/blog/currentPostStore";
import BlogSlider from "./BlogSlider";

interface BlogContentProps {
  isEdited: boolean;
  posts: CurrentPost | null;
  currentPost: CurrentPost | null;
  handleContentChange: (content: string) => void;
  currentSlide: number;
  onSlideChange: (slide: number) => void;
}

export function BlogContent({
  isEdited,
  posts,
  currentPost,
  handleContentChange,
  currentSlide,
  onSlideChange,
}: BlogContentProps) {
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
    return (
      <p className="relative flex-1 h-full pl-6 pr-4 py-4 font-mono">
        일기가 존재하지 않습니다.
      </p>
    );
  }

  return (
    <div className="relative flex-1 h-full group">
      <BlogSlider
        content={currentPost.content}
        currentSlide={currentSlide}
        onSlideChange={onSlideChange}
      />
    </div>
  );
}
