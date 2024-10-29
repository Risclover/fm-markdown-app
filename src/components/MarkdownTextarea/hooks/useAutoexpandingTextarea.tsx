import React, { SetStateAction, useCallback, useEffect, useRef } from "react";

type Props = {
  textareaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  markdown: string;
  setMarkdown: React.Dispatch<SetStateAction<string>>;
};

export const useAutoexpandingTextarea = ({
  textareaRef,
  markdown,
  setMarkdown,
}: Props) => {
  const tabSpaces = "    "; // 4 spaces
  const cursorPositionRef = useRef<number | null>(null);

  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [textareaRef]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [markdown, adjustTextareaHeight]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && cursorPositionRef.current !== null) {
      textarea.setSelectionRange(
        cursorPositionRef.current,
        cursorPositionRef.current
      );
      cursorPositionRef.current = null;
    }
  }, [markdown]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    const textarea = event.target as HTMLTextAreaElement;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Handle Tab key (insert spaces)
    if (event.key === "Tab") {
      event.preventDefault(); // Prevent default tabbing behavior

      // Insert spaces at the cursor position
      const updatedMarkdown =
        markdown.substring(0, start) + tabSpaces + markdown.substring(end);

      setMarkdown(updatedMarkdown);

      // Store the desired cursor position
      cursorPositionRef.current = start + tabSpaces.length;
    }

    // Handle Backspace (remove spaces as "tabs")
    else if (event.key === "Backspace") {
      if (start === end && start >= tabSpaces.length) {
        const precedingText = markdown.substring(
          start - tabSpaces.length,
          start
        );
        if (precedingText === tabSpaces) {
          event.preventDefault(); // Prevent default backspace behavior

          // Remove the spaces acting as a "tab"
          const updatedMarkdown =
            markdown.substring(0, start - tabSpaces.length) +
            markdown.substring(end);

          setMarkdown(updatedMarkdown);

          // Store the desired cursor position
          cursorPositionRef.current = start - tabSpaces.length;
        }
      }
    }

    // Allow default behavior for other keys, including arrow keys
  };

  return { handleChange, handleKeyDown };
};
