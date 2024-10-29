import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Document } from "./Document";
import type { MarkdownFile } from "../../types";
import { formatDate } from "./utils"; // Adjust the path as necessary

jest.mock("../../assets", () => ({
  Logos: {
    IconDocument: "icon-document-path",
  },
}));

describe("Document Component", () => {
  const setCurrentFileMock = jest.fn();
  const setShowChangesUnsavedWarningMock = jest.fn();
  const setPendingFileMock = jest.fn();

  const defaultProps = {
    date: "2023-10-01T12:00:00Z", // Use noon UTC
    file: {
      id: "1",
      title: "Doc 1",
      content: "",
      createdAt: "2023-10-01T12:00:00Z",
    },
    setCurrentFile: setCurrentFileMock,
    changesSaved: true,
    setShowChangesUnsavedWarning: setShowChangesUnsavedWarningMock,
    setPendingFile: setPendingFileMock,
    currentFile: null as MarkdownFile | null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    render(<Document {...defaultProps} />);

    const documentContainer = screen.getByText("Doc 1").closest("div");
    expect(documentContainer).toBeInTheDocument();

    const formattedDate = formatDate(defaultProps.date);
    const dateElement = screen.getByText(formattedDate);
    expect(dateElement).toBeInTheDocument();
  });

  test("calls setCurrentFile when clicked and changes are saved", () => {
    render(<Document {...defaultProps} />);

    const documentContainer = screen.getByText("Doc 1").closest("div");
    fireEvent.click(documentContainer!);

    expect(setCurrentFileMock).toHaveBeenCalledWith(defaultProps.file);
  });

  test("shows warning when clicked and changes are not saved", () => {
    render(<Document {...defaultProps} changesSaved={false} />);

    const documentContainer = screen.getByText("Doc 1").closest("div");
    fireEvent.click(documentContainer!);

    expect(setPendingFileMock).toHaveBeenCalledWith(defaultProps.file);
    expect(setShowChangesUnsavedWarningMock).toHaveBeenCalledWith(true);
    expect(setCurrentFileMock).not.toHaveBeenCalled();
  });

  test("does nothing when clicked if already the current file", () => {
    render(<Document {...defaultProps} currentFile={defaultProps.file} />);

    const documentContainer = screen.getByText("Doc 1").closest("div");
    fireEvent.click(documentContainer!);

    expect(setCurrentFileMock).not.toHaveBeenCalled();
    expect(setPendingFileMock).not.toHaveBeenCalled();
    expect(setShowChangesUnsavedWarningMock).not.toHaveBeenCalled();
  });
});
