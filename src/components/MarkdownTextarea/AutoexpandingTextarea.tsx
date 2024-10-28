import React, { SetStateAction, useRef } from "react";
import useAutoexpandingTextarea from "./hooks/useAutoexpandingTextarea";

type Props = {
  markdown: string;
  setMarkdown: React.Dispatch<SetStateAction<string>>;
};

const AutoExpandingTextarea = ({ markdown, setMarkdown }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { handleChange, handleKeyDown, handleMouseUp } =
    useAutoexpandingTextarea({
      textareaRef,
      markdown,
      setMarkdown,
    });

  return (
    <textarea
      ref={textareaRef}
      value={markdown}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onMouseUp={handleMouseUp}
      placeholder="Start typing..."
      style={{
        boxSizing: "content-box",
        overflowY: "hidden",
        resize: "none",
        fontSize: "14px",
        border: "0",
        outline: "none",
        paddingRight: "16px",
        marginRight: "10px",
        lineHeight: "24px",
        fontWeight: "400",
      }}
    />
  );
};

export default AutoExpandingTextarea;
