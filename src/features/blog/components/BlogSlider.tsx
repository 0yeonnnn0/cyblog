import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useState } from "react";

interface BlogSliderProps {
  content: string;
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const BlogSlider = ({
  content,
  currentSlide,
  onSlideChange,
}: BlogSliderProps) => {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);

  const contentSections = content
    .split(/(?=\d+\.)/)
    .filter((section) => section.trim() && section !== "<p>")
    .map((section) =>
      section
        .replace(/&nbsp;/g, "")
        .replace(/<p>\s*<\/p>/g, "")
        .trim()
    );

  if (contentSections[0] === "") {
    contentSections.shift();
  }

  const handlePrevSlide = () => {
    onSlideChange(
      currentSlide > 0 ? currentSlide - 1 : contentSections.length - 1
    );
  };

  const handleNextSlide = () => {
    onSlideChange(
      currentSlide < contentSections.length - 1 ? currentSlide + 1 : 0
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevSlide();
    if (e.key === "ArrowRight") handleNextSlide();
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const isBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 1;
    const isTop = scrollTop === 0;

    setIsScrolledToBottom(isBottom);
    setIsScrolledToTop(isTop);
  };

  return (
    <div
      className="relative h-[356px] font-mono group pl-6 pr-4 flex flex-col"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="블로그 컨텐츠 슬라이더"
    >
      <div className="absolute inset-0 flex z-[1] pointer-events-none">
        <div
          className="w-2/5 cursor-w-resize pointer-events-auto"
          onClick={handlePrevSlide}
          role="button"
          aria-label="이전 슬라이드"
        />
        <div
          className="w-3/5 cursor-e-resize pointer-events-auto"
          onClick={handleNextSlide}
          role="button"
          aria-label="다음 슬라이드"
        />
      </div>

      <div
        className="h-[350px] overflow-y-auto scrollbar-hide relative z-[2] mask-linear"
        onScroll={handleScroll}
      >
        <ReactMarkdown
          className="transition-all duration-300 ease-in-out py-2 leading-relaxed break-keep"
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
        >
          {contentSections[currentSlide]}
        </ReactMarkdown>
      </div>

      <div
        className={`absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white to-transparent z-[3] transition-opacity duration-300 ${
          isScrolledToTop ? "opacity-0" : "opacity-100"
        }`}
      />

      <div
        className={`absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent z-[3] transition-opacity duration-300 ${
          isScrolledToBottom ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default BlogSlider;
