import { Dispatch, SetStateAction, MutableRefObject } from "react";
import GBTextArea from "./GBTextArea";
import GBUserInput from "./GBUserInput";

interface GBFormProps {
  user: string;
  textRef: MutableRefObject<HTMLTextAreaElement | null>;
  guestbook: Array<any>; // 더 구체적인 타입으로 변경 가능
  setGuestbook: Dispatch<SetStateAction<Array<any>>>; // 더 구체적인 타입으로 변경 가능
}

const GBForm: React.FC<GBFormProps> = ({ user, textRef, guestbook, setGuestbook }) => {
  function changeGuestBook() {
    if (textRef.current) {
      console.log(textRef.current.value);
      // setGuestbook([textRef.current.value], [...guestbook]);
    }
  }

  return (
    <div className="guestbook-post">
      <GBUserInput user={user} />
      <div className="guestbook-upload">
        <GBTextArea textRef={textRef} />
      </div>
      <div className="flex justify-end">
        <button
          className="guestbook-upload-btn text-theme-color-blue bg-[#D1E9F6]"
          onClick={() => changeGuestBook()}
          type="submit"
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default GBForm;
