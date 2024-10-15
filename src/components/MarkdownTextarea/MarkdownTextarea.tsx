import React, { useContext, SetStateAction } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./MarkdownTextarea.css";
import AutoExpandingTextarea from "./AutoexpandingTextarea";

type Props = {
  markdown: string;
  setMarkdown: React.Dispatch<SetStateAction<string>>;
  showPreview: boolean;
};

const MarkdownContent = ({ markdown, setMarkdown, showPreview }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`markdown-content-container ${theme} ${
        !showPreview ? "show" : ""
      }`}
    >
      <AutoExpandingTextarea markdown={markdown} setMarkdown={setMarkdown} />
    </div>
  );
};

export default MarkdownContent;
