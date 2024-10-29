import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Titlebar } from "./Titlebar";
import { useTitlebar } from "./hooks";
import { ThemeContext } from "../../context";
import { Logos } from "../../assets";

jest.mock("./hooks", () => ({
  useTitlebar: jest.fn(),
}));

jest.mock("../../assets", () => ({
  Logos: {
    IconShowPreview: "icon-show-preview-path",
    IconHidePreview: "icon-hide-preview-path",
  },
}));

describe("Titlebar Component", () => {
  const setShowPreviewMock = jest.fn();
  const handlePreviewClickMock = jest.fn();

  const renderComponent = (
    props?: Partial<React.ComponentProps<typeof Titlebar>>,
    theme = "light"
  ) => {
    const defaultProps = {
      showPreview: false,
      setShowPreview: setShowPreviewMock,
      title: "Editor",
    };

    return render(
      <ThemeContext.Provider value={{ theme, toggleTheme: jest.fn() }}>
        <Titlebar {...defaultProps} {...props} />
      </ThemeContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useTitlebar as jest.Mock).mockReturnValue({
      handlePreviewClick: handlePreviewClickMock,
    });
  });

  test("renders correctly with given title", () => {
    renderComponent();

    expect(screen.getByText("Editor")).toBeInTheDocument();
  });

  test("displays the correct icon when showPreview is false", () => {
    renderComponent({ showPreview: false });

    const showPreviewButton = screen.getByRole("button");
    expect(showPreviewButton).toBeInTheDocument();

    const showPreviewIcon = screen.getByAltText("Show Preview");
    expect(showPreviewIcon).toBeInTheDocument();
    expect(showPreviewIcon).toHaveAttribute("src", "icon-show-preview-path");
  });

  test("displays the correct icon when showPreview is true", () => {
    renderComponent({ showPreview: true });

    const showPreviewButton = screen.getByRole("button");
    expect(showPreviewButton).toBeInTheDocument();

    const hidePreviewIcon = screen.getByAltText("Hide Preview");
    expect(hidePreviewIcon).toBeInTheDocument();
    expect(hidePreviewIcon).toHaveAttribute("src", "icon-hide-preview-path");
  });

  test("calls handlePreviewClick when button is clicked", () => {
    renderComponent();

    const showPreviewButton = screen.getByRole("button");
    fireEvent.click(showPreviewButton);

    expect(handlePreviewClickMock).toHaveBeenCalledTimes(1);
  });

  test("applies dark theme class when theme is dark", () => {
    renderComponent({}, "dark");

    const titleBarContainer = screen.getByText("Editor").parentElement;
    expect(titleBarContainer).toHaveClass("title-bar-container dark");
  });

  test("applies light theme class when theme is light", () => {
    renderComponent({}, "light");

    const titleBarContainer = screen.getByText("Editor").parentElement;
    expect(titleBarContainer).toHaveClass("title-bar-container");
    expect(titleBarContainer).not.toHaveClass("dark");
  });
});
