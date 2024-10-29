import { render, fireEvent, screen } from "@testing-library/react";
import { MyDocuments } from "./MyDocuments";
import { useMyDocuments } from "./hooks";
import type { MarkdownFile } from "../../types";

jest.mock("./hooks", () => ({
  useMyDocuments: jest.fn(),
}));

jest.mock("./Document", () => ({
  Document: ({ file }: any) => <div data-testid="document">{file.title}</div>,
}));

describe("MyDocuments Component", () => {
  const setCurrentFileMock = jest.fn();
  const setMarkdownMock = jest.fn();
  const setFileTitleMock = jest.fn();
  const setShowSidebarMock = jest.fn();
  const setFilesMock = jest.fn();
  const setShowChangesUnsavedWarningMock = jest.fn();
  const setPendingFileMock = jest.fn();

  const defaultProps = {
    setCurrentFile: setCurrentFileMock,
    setMarkdown: setMarkdownMock,
    setFileTitle: setFileTitleMock,
    setShowSidebar: setShowSidebarMock,
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

  test("renders correctly with no documents", () => {
    (useMyDocuments as jest.Mock).mockReturnValue({
      formatDate: jest.fn(),
      handleNewDocument: jest.fn(),
      files: [],
      setFiles: setFilesMock,
    });

    render(<MyDocuments {...defaultProps} />);

    expect(screen.getByText("My Documents")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "+ New Document" })
    ).toBeInTheDocument();
    expect(screen.queryByTestId("document")).not.toBeInTheDocument();
  });

  test("renders documents when files are provided", () => {
    const files = [
      {
        id: "1",
        title: "Doc 1",
        content: "",
        createdAt: "2023-10-01T00:00:00Z",
      },
      {
        id: "2",
        title: "Doc 2",
        content: "",
        createdAt: "2023-10-02T00:00:00Z",
      },
    ];

    (useMyDocuments as jest.Mock).mockReturnValue({
      formatDate: jest.fn(),
      handleNewDocument: jest.fn(),
      files,
      setFiles: setFilesMock,
    });

    render(<MyDocuments {...defaultProps} files={files} />);

    expect(screen.getAllByTestId("document")).toHaveLength(2);
    expect(screen.getByText("Doc 1")).toBeInTheDocument();
    expect(screen.getByText("Doc 2")).toBeInTheDocument();
  });

  test("calls handleNewDocument when new document button is clicked", () => {
    const handleNewDocumentMock = jest.fn();

    (useMyDocuments as jest.Mock).mockReturnValue({
      formatDate: jest.fn(),
      handleNewDocument: handleNewDocumentMock,
      files: [],
      setFiles: setFilesMock,
    });

    render(<MyDocuments {...defaultProps} />);

    const newDocButton = screen.getByRole("button", { name: "+ New Document" });
    fireEvent.click(newDocButton);

    expect(handleNewDocumentMock).toHaveBeenCalledTimes(1);
  });
});
