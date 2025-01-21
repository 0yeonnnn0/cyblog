import { useSelectDateStore } from "@/store/blog/selectDateStore";
import { formatDateToKorean } from "@/utils/dateUtils";
import { useState } from "react";
import { useEditStatusStore } from "@/store/blog/editStatusStore";
import { useCurrentPostStore } from "@/store/blog/currentPostStore";
import { useUserStore } from "@/store/userStore";

interface DateViewProps {
  handleEdit: () => void;
  handleCancel: () => void;
  handleSave: () => void;
  handleDelete: () => void;
}

export function DateView({
  handleEdit,
  handleCancel,
  handleSave,
  handleDelete,
}: DateViewProps) {
  const { selectDate } = useSelectDateStore();
  const isEdited = useEditStatusStore((state) => state.isEdited);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const user = useUserStore((state) => state.user);

  const handleClick = (e: React.MouseEvent) => {
    if (!user?.isAdmin) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: rect.height,
    });
    setIsModalOpen(true);
  };

  const handleClose = () => setIsModalOpen(false);

  const handleKeyboardClick = () => {
    if (!user?.isAdmin) return;

    const timeElement = document.querySelector("time");
    if (timeElement) {
      const rect = timeElement.getBoundingClientRect();
      setPosition({
        x: rect.width / 2,
        y: rect.height,
      });
      setIsModalOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handleKeyboardClick();
    }
  };

  const handleEditClick = () => {
    handleEdit();
    handleClose();
  };

  const handleSaveClick = () => {
    handleSave();
    handleClose();
  };

  const handleCancelClick = () => {
    handleCancel();
    handleClose();
  };

  const handleDeleteClick = () => {
    handleDelete();
    handleClose();
  };

  if (!user?.isAdmin) {
    return (
      <time className="block text-gray-600 font-medium">
        <span>{formatDateToKorean(selectDate).date}</span>
        <span>{formatDateToKorean(selectDate).suffix}</span>
      </time>
    );
  }

  return (
    <div className="relative">
      <time
        className="block text-gray-600 font-medium cursor-pointer hover:text-gray-800 transition-colors"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="게시글 관리 메뉴 열기"
      >
        <span>{formatDateToKorean(selectDate).date}</span>
        <span>{formatDateToKorean(selectDate).suffix}</span>
      </time>

      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={handleClose}
          />
          <div
            className="absolute bg-white rounded-lg p-2 shadow-lg min-w-[200px] z-50"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 id="modal-title" className="text-lg font-semibold">
                {isEdited ? "게시글 저장" : "게시글 관리"}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="모달 닫기"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-1.5">
              {isEdited ? (
                <>
                  <button
                    onClick={handleCancelClick}
                    className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    취소하기
                  </button>
                  <button
                    onClick={handleSaveClick}
                    className="w-full px-4 py-2.5 text-left text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    저장하기
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEditClick}
                    className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    수정하기
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 rounded-md transition-all duration-200 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    삭제하기
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
