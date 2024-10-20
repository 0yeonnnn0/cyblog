import { useCallback, MutableRefObject } from "react";

interface GBTextAreaProps {
  textRef: MutableRefObject<HTMLTextAreaElement | null>;
}

const GBTextArea: React.FC<GBTextAreaProps> = ({ textRef }) => {
  const handleResizeHeight = useCallback(() => {
    if (textRef.current) {
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  }, [textRef]);

  return (
    <textarea
      className="guestbook-textarea"
      ref={textRef}
      onInput={handleResizeHeight}
      placeholder="방명록입니다."
      rows={1}
      maxLength={300}
      name="contents"
    />
  );
};

export default GBTextArea;
