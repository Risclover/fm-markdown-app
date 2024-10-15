import { useRef } from "react";
import useAutoexpandingTextarea from "./hooks/useAutoexpandingTextarea";

const AutoExpandingTextarea = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { handleChange, textareaValue } = useAutoexpandingTextarea({
    textareaRef,
  });
  return (
    <textarea
      ref={textareaRef}
      value={textareaValue}
      onChange={handleChange}
      placeholder="Start typing..."
      style={{
        boxSizing: "content-box",
        width: "95%",
        overflowY: "hidden",
        resize: "none",
        fontSize: "14px",
        border: "0",
        outline: "none",
        padding: "10px",
        marginRight: "10px",
        lineHeight: "24px",
        fontWeight: "400",
      }}
    />
  );
};

export default AutoExpandingTextarea;
