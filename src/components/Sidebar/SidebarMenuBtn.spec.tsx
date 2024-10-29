import { render, fireEvent, screen } from "@testing-library/react";
import { SidebarMenuBtn } from "./SidebarMenuBtn";
import { useSidebarMenuBtn } from "./hooks";

jest.mock("./hooks", () => ({
  useSidebarMenuBtn: jest.fn(),
}));

describe("SidebarMenuBtn Component", () => {
  const setShowSidebarMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly and shows correct icon based on showSidebar prop", () => {
    const handleSidebarToggleMock = jest.fn();

    (useSidebarMenuBtn as jest.Mock).mockReturnValue({
      handleSidebarToggle: handleSidebarToggleMock,
    });

    render(
      <SidebarMenuBtn setShowSidebar={setShowSidebarMock} showSidebar={false} />
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    const icon = screen.getByText((content, element) =>
      element?.classList.contains("menu-icon")
    );
    expect(icon).toBeInTheDocument();
    expect(icon).not.toHaveClass("close");
  });

  test("calls handleSidebarToggle when button is clicked", () => {
    const handleSidebarToggleMock = jest.fn();

    (useSidebarMenuBtn as jest.Mock).mockReturnValue({
      handleSidebarToggle: handleSidebarToggleMock,
    });

    render(
      <SidebarMenuBtn setShowSidebar={setShowSidebarMock} showSidebar={false} />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleSidebarToggleMock).toHaveBeenCalledTimes(1);
  });
});
