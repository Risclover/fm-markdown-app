// Navbar.test.tsx
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";
import { useNavbar } from "./hooks";
import type { MarkdownFile } from "../../types";

jest.mock("./hooks", () => ({
  useNavbar: jest.fn(),
}));

jest.mock("../../assets", () => ({
  Logos: {
    Logo: "logo-path",
    IconDelete: "icon-delete-path",
    IconSave: "icon-save-path",
    IconDocument: "icon-document-path",
  },
}));

jest.mock("react-icons/fa6", () => ({
  FaCheck: () => <div data-testid="fa-check-icon" />,
}));

jest.mock("react-icons/lu", () => ({
  LuFileDown: () => <div data-testid="lu-file-down-icon" />,
}));

jest.mock("../../components", () => ({
  SidebarMenuBtn: ({ setShowSidebar, showSidebar }: any) => (
    <button
      data-testid="sidebar-menu-btn"
      onClick={() => setShowSidebar(!showSidebar)}
    >
      Toggle Sidebar
    </button>
  ),
  FileTitle: ({ fileTitle, setFileTitle }: any) => (
    <div data-testid="file-title-component">
      <input
        data-testid="file-title-input"
        value={fileTitle}
        onChange={(e) => setFileTitle(e.target.value)}
      />
    </div>
  ),
}));

describe("Navbar Component", () => {
  const setShowDeleteWarningMock = jest.fn();
  const setCurrentFileMock = jest.fn();
  const setFilesMock = jest.fn();
  const setShowIdenticalTitleWarningMock = jest.fn();
  const setChangesSavedMock = jest.fn();
  const setWarningTypeMock = jest.fn();
  const setFileTitleMock = jest.fn();
  const setShowSidebarMock = jest.fn();

  const handleDeleteMock = jest.fn();
  const handleSaveMock = jest.fn();
  const handleDownloadMock = jest.fn();
  const savedText = "Save Changes";

  const useNavbarMockReturnValue = {
    handleDelete: handleDeleteMock,
    handleSave: handleSaveMock,
    handleDownload: handleDownloadMock,
    savedText,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavbar as jest.Mock).mockReturnValue(useNavbarMockReturnValue);
  });

  const renderComponent = (
    props?: Partial<React.ComponentProps<typeof Navbar>>
  ) => {
    const defaultProps = {
      fileTitle: "my-file.md",
      setFileTitle: setFileTitleMock,
      setShowSidebar: setShowSidebarMock,
      showSidebar: false,
      setShowDeleteWarning: setShowDeleteWarningMock,
      markdown: "# Hello World",
      currentFile: {
        id: "1",
        title: "my-file.md",
        content: "# Hello World",
        createdAt: new Date().toISOString(),
      },
      setCurrentFile: setCurrentFileMock,
      files: [] as MarkdownFile[],
      setFiles: setFilesMock,
      setShowIdenticalTitleWarning: setShowIdenticalTitleWarningMock,
      changesSaved: false,
      setChangesSaved: setChangesSavedMock,
      setWarningType: setWarningTypeMock,
    };

    return render(<Navbar {...defaultProps} {...props} />);
  };

  test("renders correctly", () => {
    renderComponent();

    expect(screen.getByTestId("sidebar-menu-btn")).toBeInTheDocument();
    expect(screen.getByAltText("Markdown")).toBeInTheDocument();
    expect(screen.getByTestId("file-title-component")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Save Changes/i })
    ).toBeInTheDocument();
  });

  test("calls handleSave when save button is clicked", () => {
    renderComponent();

    const saveButton = screen.getByRole("button", { name: /Save Changes/i });
    fireEvent.click(saveButton);

    expect(handleSaveMock).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1" }),
      "my-file.md",
      "# Hello World"
    );
  });

  test("calls handleDelete when delete button is clicked", () => {
    renderComponent();

    const deleteButton = screen.getByTitle("Delete file");
    fireEvent.click(deleteButton);

    expect(handleDeleteMock).toHaveBeenCalled();
  });

  test("calls handleDownload when download button is clicked", () => {
    renderComponent();

    const downloadButton = screen.getByTitle("Download file");
    fireEvent.click(downloadButton);

    expect(handleDownloadMock).toHaveBeenCalled();
  });

  test("does not render delete and download buttons when currentFile is null", () => {
    renderComponent({ currentFile: null });

    expect(screen.queryByTitle("Delete file")).not.toBeInTheDocument();
    expect(screen.queryByTitle("Download file")).not.toBeInTheDocument();
  });

  test("toggles sidebar when sidebar menu button is clicked", () => {
    renderComponent();

    const sidebarButton = screen.getByTestId("sidebar-menu-btn");
    fireEvent.click(sidebarButton);

    expect(setShowSidebarMock).toHaveBeenCalledWith(true);
  });
});
