// DeleteDocumentWarning.test.tsx
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { DeleteDocumentWarning } from "./DeleteDocumentWarning";
import { useDeleteDocumentWarning } from "./hooks";
import type { MarkdownFile } from "../../../types";

jest.mock("./hooks", () => ({
  useDeleteDocumentWarning: jest.fn(),
}));

describe("DeleteDocumentWarning Component", () => {
  const mockSetCurrentFile = jest.fn();
  const mockSetMarkdown = jest.fn();
  const mockSetFileTitle = jest.fn();
  const mockSetShowDeleteWarning = jest.fn();
  const mockSetFiles = jest.fn();
  const files: MarkdownFile[] = [
    { id: "1", title: "File 1", content: "Content 1", createdAt: "Date 1" },
    { id: "2", title: "File 2", content: "Content 2", createdAt: "Date 2" },
  ];
  const currentFile: MarkdownFile = files[0];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with file title", () => {
    (useDeleteDocumentWarning as jest.Mock).mockReturnValue({
      handleDelete: jest.fn(),
    });

    render(
      <DeleteDocumentWarning
        currentFile={currentFile}
        setMarkdown={mockSetMarkdown}
        setFileTitle={mockSetFileTitle}
        setShowDeleteWarning={mockSetShowDeleteWarning}
        setCurrentFile={mockSetCurrentFile}
        files={files}
        setFiles={mockSetFiles}
      />
    );

    expect(screen.getByText("Delete this document?")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Are you sure you want to delete the `File 1` document and its contents\?/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Confirm & Delete/i })
    ).toBeInTheDocument();
  });

  test('calls handleDelete when "Confirm & Delete" button is clicked', () => {
    const handleDeleteMock = jest.fn();

    (useDeleteDocumentWarning as jest.Mock).mockReturnValue({
      handleDelete: handleDeleteMock,
    });

    render(
      <DeleteDocumentWarning
        currentFile={currentFile}
        setMarkdown={mockSetMarkdown}
        setFileTitle={mockSetFileTitle}
        setShowDeleteWarning={mockSetShowDeleteWarning}
        setCurrentFile={mockSetCurrentFile}
        files={files}
        setFiles={mockSetFiles}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Confirm & Delete/i }));

    expect(handleDeleteMock).toHaveBeenCalledTimes(1);
  });
});
