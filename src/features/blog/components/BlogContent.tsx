import { TextEditor } from "@/components/TextEditor";
import { CurrentPost } from "@/store/blog/currentPostStore";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

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
  return (
    <div className="blog-content p-2 flex-1 h-full font-mono">
      {isEdited ? (
        <TextEditor
          value={posts?.content || ""}
          setValue={handleContentChange}
        />
      ) : currentPost ? (
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
          {currentPost?.content}
        </ReactMarkdown>
      ) : (
        <p>일기가 존재하지 않습니다.</p>
      )}
    </div>
  );
}

export default BlogContent;
