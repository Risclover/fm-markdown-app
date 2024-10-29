// IdenticalTitleWarning.test.tsx
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { IdenticalTitleWarning } from "./IdenticalTitleWarning";

describe("IdenticalTitleWarning Component", () => {
  const mockSetShowWarning = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders duplicate warning message", () => {
    render(
      <IdenticalTitleWarning
        fileTitle="Test Title"
        setShowWarning={mockSetShowWarning}
        warningType="duplicate"
      />
    );

    expect(screen.getByText("Error: Identical Titles")).toBeInTheDocument();

    expect(
      screen.getByText((content) =>
        content.includes(
          "The title `Test Title` is already being used for another one of your files"
        )
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Confirm/i })
    ).toBeInTheDocument();
  });

  test("renders dot warning message", () => {
    render(
      <IdenticalTitleWarning
        fileTitle="Test.Title"
        setShowWarning={mockSetShowWarning}
        warningType="dot"
      />
    );

    expect(screen.getByText("Error: Identical Titles")).toBeInTheDocument();
    expect(
      screen.getByText(/The title `Test.Title` contains a dot/i)
    ).toBeInTheDocument();
  });

  test("renders blank warning message", () => {
    render(
      <IdenticalTitleWarning
        fileTitle=""
        setShowWarning={mockSetShowWarning}
        warningType="blank"
      />
    );

    expect(screen.getByText("Error: Identical Titles")).toBeInTheDocument();
    expect(
      screen.getByText(/The title for this document is currently blank/i)
    ).toBeInTheDocument();
  });

  test('calls setShowWarning(false) when "Confirm" button is clicked', () => {
    render(
      <IdenticalTitleWarning
        fileTitle="Test Title"
        setShowWarning={mockSetShowWarning}
        warningType="duplicate"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Confirm/i }));

    expect(mockSetShowWarning).toHaveBeenCalledWith(false);
  });
});
