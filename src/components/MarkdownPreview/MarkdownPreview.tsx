import { useContext, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { ThemeContext, useFile } from "../../context";
import type { MarkdownFile } from "../../types";

type Props = {
  showPreview: boolean;
};

export const MarkdownPreview = ({ showPreview }: Props) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);
  const { markdown, currentFile } = useFile();

  useEffect(() => {
    if (previewRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = previewRef.current;

      // Check if the user is near the bottom (e.g., within 100px)
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

      if (isNearBottom) {
        previewRef.current.scrollTop = previewRef.current.scrollHeight;
      }
    }
  }, [markdown, currentFile?.content]);

  return (
    <div
      className={`markdown-preview-container ${showPreview ? "show" : ""}`}
      ref={previewRef}
      data-testid="markdown-preview-container" // Added for testing
    >
      <div
        className={`markdown-preview ${theme}`}
        data-testid="markdown-preview"
      >
        <Markdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkBreaks, remarkGfm]}
        >
          {markdown || currentFile?.content}
        </Markdown>
      </div>
    </div>
  );
};
