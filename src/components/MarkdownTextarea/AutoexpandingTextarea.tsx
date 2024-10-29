import { useRef } from "react";
import { useAutoexpandingTextarea } from "./hooks";
import { useFile } from "../../context";

export const AutoexpandingTextarea = () => {
  const { markdown, setMarkdown } = useFile();

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
    />
  );
};
