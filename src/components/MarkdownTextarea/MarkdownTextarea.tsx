import { useContext } from "react";
import { ThemeContext } from "../../context";
import { AutoexpandingTextarea } from "./AutoexpandingTextarea";
import "./MarkdownTextarea.css";

type Props = {
  showPreview: boolean;
};

export const MarkdownTextarea = ({ showPreview }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`markdown-content-container ${theme} ${
        !showPreview ? "show" : ""
      }`}
      data-testid="markdown-content-container"
    >
      <AutoexpandingTextarea />
    </div>
  );
};
