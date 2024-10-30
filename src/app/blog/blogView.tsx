import {
  useBlogStore,
  useEditStatusStore,
  useSelectDateStore,
} from "@/store/blogStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useUserStore } from "@/store/userStore";

export function DateView() {
  const selectDate = useSelectDateStore((state) => state.selectDate);
  return (
    <time className="block mb-3 text-gray-600 font-medium">
      {selectDate?.getFullYear()}년 {selectDate?.getMonth() + 1}월{" "}
      {selectDate?.getDate()}일
    </time>
  );
}
interface BlogFooterProps {
  handleLikey: () => void;
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
          <LikeButton count={currentPost.likey} onLike={handleLikey} />
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
interface LikeButtonProps {
  count: number;
  onLike: () => void;
}

export function LikeButton({ count, onLike }: LikeButtonProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="transition-colors duration-200 hover:text-red-500"
        onClick={onLike}
      >
        <FontAwesomeIcon icon={faHeart} className="text-xl" />
      </button>
      <span className="text-gray-600">{count}</span>
    </div>
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
