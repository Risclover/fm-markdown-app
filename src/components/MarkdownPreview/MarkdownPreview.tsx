import React, { useContext } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { ThemeContext } from "../../context/ThemeContext";

type Props = {
  markdown: string;
};

const MarkdownPreview = ({ markdown }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`markdown-preview ${theme}`}>
      <Markdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkBreaks, remarkGfm]}
      >
        {markdown}
      </Markdown>
    </div>
  );
};

export default MarkdownPreview;
