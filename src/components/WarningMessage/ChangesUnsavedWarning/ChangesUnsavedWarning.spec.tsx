// ChangesUnsavedWarning.test.tsx
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { ChangesUnsavedWarning } from "./ChangesUnsavedWarning";
import type { MarkdownFile } from "../../../types";

describe("ChangesUnsavedWarning Component", () => {
  const mockSetChangesSaved = jest.fn();
  const mockSetShowChangesUnsavedWarning = jest.fn();
  const mockSetCurrentFile = jest.fn();
  const mockSetPendingFile = jest.fn();
  const pendingFile: MarkdownFile = {
    id: "123",
    title: "Pending File",
    content: "Content",
    createdAt: "Date",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with heading and message", () => {
    render(
      <ChangesUnsavedWarning
        changesSaved={true} // or false, depending on your test case
        setChangesSaved={mockSetChangesSaved}
        setShowChangesUnsavedWarning={mockSetShowChangesUnsavedWarning}
        setCurrentFile={mockSetCurrentFile}
        setPendingFile={mockSetPendingFile}
        pendingFile={pendingFile}
      />
    );

    expect(screen.getByText("Unsaved Changes!")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Are you sure you would like to open a different document\?/i
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Continue/i })
    ).toBeInTheDocument();
  });

  test('calls handleCancel when "Cancel" button is clicked', () => {
    render(
      <ChangesUnsavedWarning
        changesSaved={true} // or false, depending on your test case
        setChangesSaved={mockSetChangesSaved}
        setShowChangesUnsavedWarning={mockSetShowChangesUnsavedWarning}
        setCurrentFile={mockSetCurrentFile}
        setPendingFile={mockSetPendingFile}
        pendingFile={pendingFile}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    expect(mockSetShowChangesUnsavedWarning).toHaveBeenCalledWith(false);
    expect(mockSetPendingFile).toHaveBeenCalledWith(null);
    expect(mockSetChangesSaved).not.toHaveBeenCalled();
    expect(mockSetCurrentFile).not.toHaveBeenCalled();
  });

  test('calls handleContinue when "Continue" button is clicked', () => {
    render(
      <ChangesUnsavedWarning
        changesSaved={true} // or false, depending on your test case
        setChangesSaved={mockSetChangesSaved}
        setShowChangesUnsavedWarning={mockSetShowChangesUnsavedWarning}
        setCurrentFile={mockSetCurrentFile}
        setPendingFile={mockSetPendingFile}
        pendingFile={pendingFile}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

    expect(mockSetShowChangesUnsavedWarning).toHaveBeenCalledWith(false);
    expect(mockSetCurrentFile).toHaveBeenCalledWith(pendingFile);
    expect(mockSetPendingFile).toHaveBeenCalledWith(null);
    expect(mockSetChangesSaved).toHaveBeenCalledWith(true);
  });
});
