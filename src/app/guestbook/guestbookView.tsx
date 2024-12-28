import { useCallback, MutableRefObject } from "react";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 공통 타입 정의
export interface GuestbookEntry {
  _id: string;
  guestName: string;
  date: string;
  contents: string;
  isUser: boolean;
}

// 컴포넌트 Props 타입 정의
interface GBUserInputProps {
  user: string | null;
}

interface GBTextAreaProps {
  textRef: MutableRefObject<HTMLTextAreaElement | null>;
}

interface GBFormProps {
  user: string;
  textRef: MutableRefObject<HTMLTextAreaElement | null>;
  onSubmit: (content: string) => void;
}

interface GBContentsProps {
  guestbook: GuestbookEntry[];
  onDelete: (id: string) => void;
}

// 사용자 입력 컴포넌트
export function GBUserInput({ user }: GBUserInputProps) {
  if (user) {
    return (
      <div>
        <input className="hidden" type="checkbox" name="isUser" checked readOnly />
        <input
          type="text"
          className="guestbook-writer guestbook-logged-in"
          value={user}
          name="guestName"
          readOnly
        />
      </div>
    );
  }

  return (
    <div className="border-b-2 border-solid border-gray-200 border-collapse m-0">
      <input className="hidden" type="checkbox" name="isUser" />
      <input
        type="text"
        className="guestbook-user-info rounded-tl border-x-2 m-0"
        placeholder="이름"
        name="guestName"
      />
      <input
        type="password"
        className="guestbook-user-info border-r-2 rounded-tr m-0"
        placeholder="비밀번호"
        name="pw"
      />
    </div>
  );
}

// 텍스트 영역 컴포넌트
export function GBTextArea({ textRef }: GBTextAreaProps) {
  const handleResizeHeight = useCallback(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, [textRef]);

  return (
    <textarea
      className="guestbook-textarea"
      ref={textRef}
      onInput={handleResizeHeight}
      placeholder="방명록을 작성해주세요."
      rows={1}
      maxLength={300}
      name="contents"
    />
  );
}

// 방명록 작성 폼 컴포넌트
export function GBForm({ user, textRef, onSubmit }: GBFormProps) {
  const handleSubmit = () => {
    if (textRef.current?.value) {
      onSubmit(textRef.current.value);
    }
  };

  return (
    <div className="guestbook-post">
      <GBUserInput user={user} />
      <div className="guestbook-upload">
        <GBTextArea textRef={textRef} />
      </div>
      <div className="flex justify-end">
        <button
          className="guestbook-upload-btn text-theme-color-blue bg-[#D1E9F6]"
          onClick={handleSubmit}
          type="submit"
        >
          등록
        </button>
      </div>
    </div>
  );
}

// 방명록 항목 컴포넌트
function GuestbookItem({ entry, onDelete }: { entry: GuestbookEntry; onDelete: (id: string) => void }) {
  return (
    <div className="guestbook-comments">
      <div className="guestbook-header flex justify-between w-full pr-4">
        <div
          className={`guestbook-username font-bold font-mono ${
            entry.isUser ? "text-blue-500" : ""
          }`}
        >
          {entry.guestName}
        </div>
        <FontAwesomeIcon
          icon={faEllipsisV}
          className="guestbook-delete-btn text-gray-500 cursor-pointer"
          onClick={() => onDelete(entry._id)}
        />
      </div>
      <div className="pl-6 w-full font-mono">{entry.contents}</div>
      <div className="guestbook-footer pl-6 text-sm">
        <div className="guestbook-upload-date">{entry.date.slice(2, 10)}</div>
      </div>
    </div>
  );
}

// 방명록 목록 컴포넌트
export function GBContents({ guestbook, onDelete }: GBContentsProps) {
  return (
    <div className="border-t border-solid border-gray-300">
      {guestbook?.map((entry) => (
        <GuestbookItem key={entry._id} entry={entry} onDelete={onDelete} />
      ))}
    </div>
  );
}