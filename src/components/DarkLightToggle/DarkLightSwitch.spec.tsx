import { render, fireEvent } from "@testing-library/react";
import { DarkLightSwitch } from "./DarkLightSwitch";
import { ThemeContext } from "../../context";

describe("DarkLightSwitch", () => {
  const toggleThemeMock = jest.fn();

  const renderComponent = (theme: string) =>
    render(
      <ThemeContext.Provider value={{ theme, toggleTheme: toggleThemeMock }}>
        <DarkLightSwitch />
      </ThemeContext.Provider>
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    const { getByRole } = renderComponent("light");
    const checkbox = getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  test("checkbox is checked when theme is light", () => {
    const { getByRole } = renderComponent("light");
    const checkbox = getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  test("checkbox is unchecked when theme is dark", () => {
    const { getByRole } = renderComponent("dark");
    const checkbox = getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  test("calls toggleTheme when checkbox is clicked", () => {
    const { getByRole } = renderComponent("light");
    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
