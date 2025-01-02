import { LikeButton } from "@/components/blog/LikeButton";
import {
  useBlogStore,
  useEditStatusStore,
  useSelectDateStore,
} from "@/store/blogStore";
import { useUserStore } from "@/store/userStore";
import { formatDateToKorean } from "@/utils/dateUtils";

export function DateView() {
  const { selectDate } = useSelectDateStore();

  return (
    <time className="block mb-3 text-gray-600 font-medium">
      {formatDateToKorean(selectDate)}
    </time>
  );
}

interface BlogFooterProps {
  handleLikey: (postId: string) => Promise<void>;
  handleEdit: () => void;
  handleSave: () => void;
  handleCancel: () => void;
  handleDelete: () => void;
}
export function BlogFooter({
  handleLikey,
  handleDelete,
  handleCancel,
  handleSave,
  handleEdit,
}: BlogFooterProps) {
  const user = useUserStore((state) => state.user);
  const isEdited = useEditStatusStore((state) => state.isEdited);
  const currentPost = useBlogStore((state) => state.currentPost);

  return (
    <footer className="flex justify-between border-t-2 border-gray-300 border-dashed px-4 pt-3">
      <div className="flex items-center">
        {currentPost && (
          <LikeButton
            count={currentPost.likey}
            onLike={() => handleLikey(currentPost._id as string)}
          />
        )}
      </div>

      {user?.isAdmin && (
        <div className="flex gap-2">
          {isEdited ? (
            <>
              <BlogButton
                variant="secondary"
                text="취소"
                onClick={handleCancel}
              />
              <BlogButton variant="primary" text="저장" onClick={handleSave} />
            </>
          ) : (
            <>
              <BlogButton
                variant="secondary"
                text="수정"
                onClick={handleEdit}
              />
              {currentPost && (
                <BlogButton
                  variant="danger"
                  text="삭제"
                  onClick={handleDelete}
                />
              )}
            </>
          )}
        </div>
      )}
    </footer>
  );
}

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
}

export function BlogButton({
  text,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const variants = {
    primary: "text-black hover:bg-blue-600",
    secondary: "text-gray-700 hover:bg-gray-50",
    danger: "text-black hover:bg-red-600",
  };

  return (
    <button
      className={`
        px-4 py-1.5 rounded-sm
        transition-colors duration-200
        border border-gray-300
        ${variants[variant]}
      `}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
