import { LikeButton } from "@/components/blog/LikeButton";
import { useEditStatusStore } from "@/store/blog/editStatusStore";
import { useUserStore } from "@/store/userStore";
import { BlogButton } from "./BlogButton";
import { useCurrentPostStore } from "@/store/blog/currentPostStore";

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
  const currentPost = useCurrentPostStore((state) => state.currentPost);

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
