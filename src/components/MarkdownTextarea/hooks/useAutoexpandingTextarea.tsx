import React, { SetStateAction, useEffect } from "react";

type Props = {
  textareaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  markdown: string;
  setMarkdown: React.Dispatch<SetStateAction<string>>;
};

const useAutoexpandingTextarea = ({
  textareaRef,
  markdown,
  setMarkdown,
}: Props) => {
  const tabSpaces = "    "; // 4 spaces

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [markdown]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  const adjustCursorForTabs = (textarea: HTMLTextAreaElement): void => {
    const position = textarea.selectionStart;
    const textUpToCursor = textarea.value.substring(0, position);
    const lines = textUpToCursor.split("\n");

    const currentLineNumber = lines.length - 1;
    const currentColumn = lines[lines.length - 1].length;

    // Get the content of the current line
    const allLines = textarea.value.split("\n");
    const currentLine = allLines[currentLineNumber] || "";

    const tabSize = tabSpaces.length;
    const lineLength = currentLine.length;

    // Find all tab positions in the current line
    const tabPositions: { start: number; end: number }[] = [];

    for (let i = 0; i <= lineLength - tabSize; i++) {
      if (currentLine.substr(i, tabSize) === tabSpaces) {
        tabPositions.push({ start: i, end: i + tabSize });
        i += tabSize - 1; // Move index forward to avoid overlapping tabs
      }
    }

    // Now check if the cursor is within any of these tabs
    let isWithinTab = false;
    let nearestTabStop = currentColumn; // Initialize with current column

    for (let i = 0; i < tabPositions.length; i++) {
      const tabStart = tabPositions[i].start;
      const tabEnd = tabPositions[i].end;

      if (currentColumn >= tabStart && currentColumn < tabEnd) {
        isWithinTab = true;

        // Always snap to the end of the current tab
        nearestTabStop = tabEnd;

        break; // Stop checking after finding the current tab
      }
    }

    if (isWithinTab) {
      // Adjust cursor position
      const lineStartPosition = position - currentColumn;
      const newCursorPos = lineStartPosition + nearestTabStop;

      textarea.selectionStart = textarea.selectionEnd = newCursorPos;
    }
  };

  // Event handler for mouse up events
  const handleMouseUp = (
    event: React.MouseEvent<HTMLTextAreaElement>
  ): void => {
    const textarea = event.target as HTMLTextAreaElement;
    // Adjust cursor after the mouse action
    setTimeout(() => {
      adjustCursorForTabs(textarea);
    }, 0);
  };

  // Event handler for key down events
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

      // Move the cursor to the correct position after the inserted spaces
      textarea.selectionStart = textarea.selectionEnd =
        start + tabSpaces.length;
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

          // Move the cursor back by the length of the tab
          textarea.selectionStart = textarea.selectionEnd =
            start - tabSpaces.length;
        }
      }
    }

    // Handle Left and Right Arrows (move by tab length if at a tab)
    else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      event.preventDefault(); // Prevent default arrow key behavior

      const position = textarea.selectionStart;

      // Get the content of the current line
      const textUpToCursor = markdown.substring(0, position);
      const lines = textUpToCursor.split("\n");
      const currentLineNumber = lines.length - 1;
      const currentLineStartPos = position - lines[lines.length - 1].length;

      const allLines = markdown.split("\n");
      const currentLine = allLines[currentLineNumber] || "";
      const lineLength = currentLine.length;

      const tabSize = tabSpaces.length;

      // Find all tab positions in the current line
      const tabPositions: { start: number; end: number }[] = [];
      for (let i = 0; i <= lineLength - tabSize; i++) {
        if (currentLine.substr(i, tabSize) === tabSpaces) {
          tabPositions.push({ start: i, end: i + tabSize });
          i += tabSize - 1; // Avoid overlapping
        }
      }

      const columnPosition = position - currentLineStartPos;
      let newCursorPos = position + direction; // Default movement

      if (direction === -1) {
        // Moving left
        // Check if the cursor is at the start or within a tab
        for (const tab of tabPositions) {
          if (columnPosition > tab.start && columnPosition <= tab.end) {
            // Move cursor to start of the tab
            newCursorPos = currentLineStartPos + tab.start;
            break;
          }
        }
      } else {
        // Moving right
        // Check if the cursor is at the start or within a tab
        for (const tab of tabPositions) {
          if (columnPosition >= tab.start && columnPosition < tab.end) {
            // Move cursor to end of the tab
            newCursorPos = currentLineStartPos + tab.end;
            break;
          }
        }
      }

      // Update the cursor position
      textarea.selectionStart = textarea.selectionEnd = newCursorPos;
    }

    // Handle Up and Down Arrows (adjust cursor position after movement)
    else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      // Let the default action happen first, then adjust the cursor
      setTimeout(() => {
        const textarea = textareaRef.current;
        if (textarea) {
          adjustCursorForTabs(textarea);
        }
      }, 0);
    }
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (document.activeElement === textarea) {
        adjustCursorForTabs(textarea);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return { handleChange, handleKeyDown, handleMouseUp };
};

export default useAutoexpandingTextarea;
