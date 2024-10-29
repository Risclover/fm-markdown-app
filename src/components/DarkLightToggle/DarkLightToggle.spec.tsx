import { render, fireEvent } from "@testing-library/react";
import { DarkLightToggle } from "./DarkLightToggle";
import { ThemeContext } from "../../context";

jest.mock("../../assets", () => ({
  Logos: {
    IconDarkMode: "dark-mode-icon-path",
    IconLightMode: "light-mode-icon-path",
  },
}));

describe("DarkLightToggle", () => {
  const toggleThemeMock = jest.fn();

  const renderComponent = (theme: string) =>
    render(
      <ThemeContext.Provider value={{ theme, toggleTheme: toggleThemeMock }}>
        <DarkLightToggle />
      </ThemeContext.Provider>
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with dark theme", () => {
    const { getByAltText } = renderComponent("dark");
    expect(getByAltText("Dark mode")).toBeInTheDocument();
    expect(getByAltText("Light mode")).toBeInTheDocument();
  });

  test("renders correctly with light theme", () => {
    const { getByAltText } = renderComponent("light");
    expect(getByAltText("Dark mode")).toBeInTheDocument();
    expect(getByAltText("Light mode")).toBeInTheDocument();
  });

  test("dark mode icon has active class when theme is dark", () => {
    const { getByAltText } = renderComponent("dark");
    const darkModeIcon = getByAltText("Dark mode");
    expect(darkModeIcon).toHaveClass("active");
  });

  test("light mode icon has active class when theme is light", () => {
    const { getByAltText } = renderComponent("light");
    const lightModeIcon = getByAltText("Light mode");
    expect(lightModeIcon).toHaveClass("active");
  });

  test("toggleTheme is called when switch is clicked", () => {
    const { getByRole } = renderComponent("light");
    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
