import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { WarningMessage } from "./WarningMessage";

describe("WarningMessage Component", () => {
  const mockSetShowWarning = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders children correctly", () => {
    const { getByText } = render(
      <WarningMessage setShowWarning={mockSetShowWarning}>
        <div>Test Content</div>
      </WarningMessage>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });

  test("calls setShowWarning(false) when background is clicked", () => {
    const { container } = render(
      <WarningMessage setShowWarning={mockSetShowWarning}>
        <div>Test Content</div>
      </WarningMessage>
    );

    const background = container.querySelector(".warning-message-background");
    if (background) {
      fireEvent.click(background);
    }

    expect(mockSetShowWarning).toHaveBeenCalledWith(false);
  });
});
