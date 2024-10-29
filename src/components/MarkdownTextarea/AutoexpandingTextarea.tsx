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
    />
  );
};
