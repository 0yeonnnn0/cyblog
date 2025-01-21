import { LikeButton } from "@/features/blog/components/LikeButton";
import { useEditStatusStore } from "@/store/blog/editStatusStore";
import { useUserStore } from "@/store/userStore";
import { BlogButton } from "@/features/blog/components/BlogButton";
import { useCurrentPostStore } from "@/store/blog/currentPostStore";
import { BlogPagination } from "@/features/blog/components/BlogPagination";

interface BlogFooterProps {
  handleLikey: (postId: string) => Promise<void>;
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (slide: number) => void;
}

export function BlogFooter({
  currentSlide,
  totalSlides,
  onSlideChange,
}: BlogFooterProps) {
  const isEdited = useEditStatusStore((state) => state.isEdited);
  const currentPost = useCurrentPostStore((state) => state.currentPost);

  if (!currentPost && !isEdited) return null;

  return (
    <footer className="relative flex justify-center items-end border-gray-300 border-dashed h-full">
      {/* <div className="flex items-center">
        {currentPost && (
          <LikeButton
            count={currentPost.likey || 0}
            onLike={() => handleLikey(currentPost._id as string)}
          />
        )}
      </div> */}

      {!isEdited && (
        <BlogPagination
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onSlideChange={onSlideChange}
        />
      )}
    </footer>
  );
}
