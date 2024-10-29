import { render, fireEvent, screen } from "@testing-library/react";
import { AutoexpandingTextarea } from "./AutoexpandingTextarea";

describe("AutoexpandingTextarea", () => {
  const setMarkdownMock = jest.fn();

  const renderComponent = (markdown: string) => {
    render(
      <AutoexpandingTextarea
        markdown={markdown}
        setMarkdown={setMarkdownMock}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with initial markdown", () => {
    const initialMarkdown = "Initial content";
    renderComponent(initialMarkdown);
    const textarea = screen.getByPlaceholderText(
      "Start typing..."
    ) as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe(initialMarkdown);
  });

  test("updates markdown when user types", () => {
    renderComponent("");
    const textarea = screen.getByPlaceholderText(
      "Start typing..."
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "New content" } });
    expect(setMarkdownMock).toHaveBeenCalledWith("New content");
  });

  test("inserts spaces when Tab key is pressed", () => {
    renderComponent("");
    const textarea = screen.getByPlaceholderText(
      "Start typing..."
    ) as HTMLTextAreaElement;
    textarea.focus();
    fireEvent.keyDown(textarea, { key: "Tab", code: "Tab", charCode: 9 });

    // The default tabSpaces is 4 spaces
    const expectedMarkdown = "    ";
    expect(setMarkdownMock).toHaveBeenCalledWith(expectedMarkdown);
  });

  test("removes spaces when Backspace key is pressed after tab spaces", () => {
    const initialMarkdown = "    ";
    renderComponent(initialMarkdown);
    const textarea = screen.getByPlaceholderText(
      "Start typing..."
    ) as HTMLTextAreaElement;

    // Set cursor position at the end
    textarea.selectionStart = 4;
    textarea.selectionEnd = 4;

    fireEvent.keyDown(textarea, {
      key: "Backspace",
      code: "Backspace",
      charCode: 8,
    });

    expect(setMarkdownMock).toHaveBeenCalledWith("");
  });

  test("does not remove spaces when Backspace key is pressed in middle of text", () => {
    const initialMarkdown = "Hello    World";
    renderComponent(initialMarkdown);
    const textarea = screen.getByPlaceholderText(
      "Start typing..."
    ) as HTMLTextAreaElement;

    // Set cursor position somewhere in the middle
    textarea.selectionStart = 7;
    textarea.selectionEnd = 7;

    fireEvent.keyDown(textarea, {
      key: "Backspace",
      code: "Backspace",
      charCode: 8,
    });

    // Since the preceding text is not a tab, the default behavior should occur
    expect(setMarkdownMock).not.toHaveBeenCalled();
  });
});
