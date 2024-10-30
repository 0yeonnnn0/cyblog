"use client";

import { useBlogController } from "./blogController";
import { TextEditor } from "@/components/TextEditor";
import { BlogFooter, DateView } from "./blogView";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

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

  return (
    <div className="flex flex-col content-between min-h-full">
      <DateView />

      <div className="blog-content p-2 flex-1 h-full font-mono">
        {isEdited ? (
          <TextEditor
            value={posts.content || ""}
            setValue={handleContentChange}
          />
        ) : currentPost ? (
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {currentPost?.content}
          </ReactMarkdown>
        ) : (
          <p>일기가 존재하지 않습니다.</p>
        )}
      </div>
      <BlogFooter
        handleLikey={handleLikey}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </div>
  );
}
