import { useEditStatusStore, useSelectDateStore } from "@/store/blogStore";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useUserStore } from "@/store/userStore";

export function DateView() {
  const selectDate = useSelectDateStore((state) => state.selectDate);
  return (
    <div className="mb-3">
      {selectDate?.getFullYear()}년 {selectDate?.getMonth() + 1}월{" "}
      {selectDate?.getDate()}일
    </div>
  );
}

interface BlogFooterProps {
  onSaveClick: () => void;
}
export function BlogFooter({ onSaveClick }: BlogFooterProps) {
  const [likes, setLikes] = useState<number>(0);
  const user = useUserStore((state) => state.user);
  const isEdited = useEditStatusStore((state) => state.isEdited); // isEdited 상태 가져오기
  const setIsEdited = useEditStatusStore((state) => state.setIsEdited);

  const handleEdit = () => {
    useEditStatusStore.getState().setIsEdited(true);
  };
  const handleSave = () => {
    useEditStatusStore.getState().setIsEdited(false);
    onSaveClick();
    console.log("tlqkf");
  };

  return (
    <div className="flex justify-between border-t-2 border-gray-300 border-dashed px-3 pt-2">
      <div className="flex gap-2 pt-1">
        <button
          className="float-right ml-1 text-xl pt-0.5"
          onClick={() => setLikes(likes + 1)}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <p className="float-right inline pt-1">{likes}</p>
      </div>
      {user?.isAdmin && (
        <div>
          {isEdited ? (
            <BlogButton text="저장" onClick={handleSave} /> // isEdited가 true일 때 "저장" 버튼 표시
          ) : (
            <>
              <BlogButton text="수정" onClick={handleEdit} className="mr-2" />{" "}
              <BlogButton text="삭제" />
            </>
          )}
        </div>
      )}
    </div>
  );
}

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export function BlogButton({ text, onClick, className }: ButtonProps) {
  return (
    <button
      className={`border border-gray-400 px-4 py-1 h-8 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
