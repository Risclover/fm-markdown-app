import React, { SetStateAction, useRef } from "react";
import { useAutoexpandingTextarea } from "./hooks";

type Props = {
  markdown: string;
  setMarkdown: React.Dispatch<SetStateAction<string>>;
};

export const AutoexpandingTextarea = ({ markdown, setMarkdown }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { handleChange, handleKeyDown } = useAutoexpandingTextarea({
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
