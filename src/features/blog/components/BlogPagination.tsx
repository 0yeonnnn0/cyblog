interface BlogPaginationProps {
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (index: number) => void;
}

const BlogPagination = ({
  currentSlide,
  totalSlides,
  onSlideChange,
}: BlogPaginationProps) => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-20">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`w-2 h-2 rounded-full ${
            currentSlide === index ? "bg-theme-color-blue" : "bg-gray-300"
          }`}
          aria-label={`${index + 1}번 슬라이드로 이동`}
        />
      ))}
    </div>
  );
};

export default BlogPagination;
