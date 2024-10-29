import { render, screen } from "@testing-library/react";
import { MarkdownTextarea } from "./MarkdownTextarea";
import { ThemeContext } from "../../context";

describe("MarkdownTextarea", () => {
  const setMarkdownMock = jest.fn();

  const renderComponent = (
    markdown: string,
    showPreview: boolean,
    theme: string = "light"
  ) => {
    return render(
      <ThemeContext.Provider value={{ theme, toggleTheme: jest.fn() }}>
        <MarkdownTextarea
          markdown={markdown}
          setMarkdown={setMarkdownMock}
          showPreview={showPreview}
        />
      </ThemeContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with theme and show/hide classes", () => {
    renderComponent("", false, "dark");
    const container = screen.getByTestId("markdown-content-container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("markdown-content-container", "dark", "show");
  });

  test('does not have "show" class when showPreview is true', () => {
    renderComponent("", true, "light");
    const container = screen.getByTestId("markdown-content-container");
    expect(container).not.toHaveClass("show");
  });

  test("passes props correctly to AutoexpandingTextarea", () => {
    renderComponent("Initial content", false);
    const textarea = screen.getByPlaceholderText(
      "Start typing..."
    ) as HTMLTextAreaElement;
    expect(textarea.value).toBe("Initial content");
  });
});
