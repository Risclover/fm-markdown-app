import { render, screen } from "@testing-library/react";
import { Sidebar } from "./Sidebar";
import type { MarkdownFile } from "../../types";

jest.mock("../../assets", () => ({
  Logos: {
    Logo: "logo-path",
  },
}));

jest.mock("../../components", () => ({
  DarkLightToggle: () => <div data-testid="dark-light-toggle" />,
  MyDocuments: () => <div data-testid="my-documents" />,
}));

describe("Sidebar Component", () => {
  const setShowSidebarMock = jest.fn();
  const setFileTitleMock = jest.fn();
  const setMarkdownMock = jest.fn();
  const setCurrentFileMock = jest.fn();
  const setFilesMock = jest.fn();
  const setShowChangesUnsavedWarningMock = jest.fn();
  const setPendingFileMock = jest.fn();

  const defaultProps = {
    showSidebar: true,
    setShowSidebar: setShowSidebarMock,
    setFileTitle: setFileTitleMock,
    setMarkdown: setMarkdownMock,
    setCurrentFile: setCurrentFileMock,
    files: [] as MarkdownFile[],
    setFiles: setFilesMock,
    changesSaved: true,
    setShowChangesUnsavedWarning: setShowChangesUnsavedWarningMock,
    setPendingFile: setPendingFileMock,
    currentFile: null as MarkdownFile | null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly when open", () => {
    render(<Sidebar {...defaultProps} />);

    const sidebar = screen.getByRole("complementary"); // Assuming you have role="complementary" in sidebar
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveClass("open");

    const logo = screen.getByAltText("Markdown");
    expect(logo).toBeInTheDocument();

    expect(screen.getByTestId("my-documents")).toBeInTheDocument();
    expect(screen.getByTestId("dark-light-toggle")).toBeInTheDocument();
  });

  test('does not have "open" class when showSidebar is false', () => {
    render(<Sidebar {...defaultProps} showSidebar={false} />);

    const sidebar = screen.getByRole("complementary");
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).not.toHaveClass("open");
  });
});
