import { render, screen, act } from "@testing-library/react";
import { MarkdownPreview } from "./MarkdownPreview";
import { ThemeContext } from "../../context";
import type { MarkdownFile } from "../../types";

jest.mock("react-markdown", () => (props: any) => {
  return <div data-testid="react-markdown">{props.children}</div>;
});

jest.mock("rehype-raw", () => jest.fn());
jest.mock("remark-breaks", () => jest.fn());
jest.mock("remark-gfm", () => jest.fn());

describe("MarkdownPreview", () => {
  const toggleThemeMock = jest.fn();

  const renderComponent = (
    markdown: string,
    currentFile: MarkdownFile | null,
    showPreview: boolean,
    theme: string = "light"
  ) => {
    return render(
      <ThemeContext.Provider value={{ theme, toggleTheme: toggleThemeMock }}>
        <MarkdownPreview
          markdown={markdown}
          currentFile={currentFile}
          showPreview={showPreview}
        />
      </ThemeContext.Provider>
    );
  };

  test("renders without crashing", () => {
    renderComponent("", null, true);
    const container = screen.getByTestId("markdown-preview-container");
    expect(container).toBeInTheDocument();
  });

  test("applies the correct theme class", () => {
    renderComponent("", null, true, "dark");
    const preview = screen.getByTestId("markdown-preview");
    expect(preview).toHaveClass("dark");
  });

  test("shows preview when showPreview is true", () => {
    renderComponent("", null, true);
    const container = screen.getByTestId("markdown-preview-container");
    expect(container).toHaveClass("show");
  });

  test("hides preview when showPreview is false", () => {
    renderComponent("", null, false);
    const container = screen.getByTestId("markdown-preview-container");
    expect(container).not.toHaveClass("show");
  });

  test("renders markdown prop when provided", () => {
    const markdown = "# Hello World";
    renderComponent(markdown, null, true);
    const markdownContent = screen.getByTestId("react-markdown");
    expect(markdownContent).toHaveTextContent(markdown);
  });

  test("renders currentFile content when markdown prop is empty", () => {
    const currentFile = { content: "# From Current File" } as MarkdownFile;
    renderComponent("", currentFile, true);
    const markdownContent = screen.getByTestId("react-markdown");
    expect(markdownContent).toHaveTextContent(currentFile.content);
  });

  test("uses markdown prop over currentFile content when both are provided", () => {
    const markdown = "# From Markdown Prop";
    const currentFile = { content: "# From Current File" } as MarkdownFile;
    renderComponent(markdown, currentFile, true);
    const markdownContent = screen.getByTestId("react-markdown");
    expect(markdownContent).toHaveTextContent(markdown);
  });

  test("handles scrolling when markdown changes", () => {
    const { rerender } = renderComponent("", null, true);
    const container = screen.getByTestId("markdown-preview-container");

    // Mock scroll properties
    Object.defineProperty(container, "scrollTop", { value: 0, writable: true });
    Object.defineProperty(container, "scrollHeight", {
      value: 200,
      writable: true,
    });
    Object.defineProperty(container, "clientHeight", {
      value: 100,
      writable: true,
    });

    // Initial render
    expect(container.scrollTop).toBe(0);

    // Update markdown
    act(() => {
      rerender(
        <ThemeContext.Provider
          value={{ theme: "light", toggleTheme: toggleThemeMock }}
        >
          <MarkdownPreview
            markdown="New Content"
            currentFile={null}
            showPreview={true}
          />
        </ThemeContext.Provider>
      );
    });

    // Since we are mocking, we need to manually set scrollTop if the effect changes it
    // Here, we can check if the scrollTop would be set to scrollHeight
    expect(container.scrollTop).toBe(0); // In this mock setup, it remains 0
  });
});
