import React, { useContext, SetStateAction } from "react";
import { ThemeContext } from "../../context";
import { AutoexpandingTextarea } from "./AutoexpandingTextarea";
import "./MarkdownTextarea.css";

type Props = {
  markdown: string;
  setMarkdown: React.Dispatch<SetStateAction<string>>;
  showPreview: boolean;
};

export const MarkdownTextarea = ({
  markdown,
  setMarkdown,
  showPreview,
}: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`markdown-content-container ${theme} ${
        !showPreview ? "show" : ""
      }`}
    >
      <AutoexpandingTextarea markdown={markdown} setMarkdown={setMarkdown} />
    </div>
  );
};
