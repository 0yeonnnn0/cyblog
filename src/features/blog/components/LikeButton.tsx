import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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
        aria-label="좋아요"
      >
        <FontAwesomeIcon icon={faHeart} className="text-xl" />
      </button>
      <span className="text-gray-600">{count}</span>
    </div>
  );
}
