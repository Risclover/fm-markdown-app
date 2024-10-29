import { render, fireEvent, screen } from "@testing-library/react";
import { FileTitle } from "./FileTitle";
import { useFileTitle } from "./hooks";

jest.mock("./hooks", () => ({
  useFileTitle: jest.fn(),
}));

jest.mock("../../assets", () => ({
  Logos: {
    IconDocument: "icon-document-path",
  },
}));

describe("FileTitle Component", () => {
  const setFileTitleMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with given fileTitle", () => {
    const fileTitle = "my-file.md";

    (useFileTitle as jest.Mock).mockReturnValue({
      updateTitle: jest.fn(),
    });

    render(<FileTitle fileTitle={fileTitle} setFileTitle={setFileTitleMock} />);

    expect(screen.getByText("Document Name")).toBeInTheDocument();
    const input = screen.getByPlaceholderText("welcome.md") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe(fileTitle);
  });

  test("calls updateTitle when input value changes", () => {
    const fileTitle = "my-file.md";
    const updateTitleMock = jest.fn();

    (useFileTitle as jest.Mock).mockReturnValue({
      updateTitle: updateTitleMock,
    });

    render(<FileTitle fileTitle={fileTitle} setFileTitle={setFileTitleMock} />);

    const input = screen.getByPlaceholderText("welcome.md") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "new-file.md" } });

    expect(updateTitleMock).toHaveBeenCalledTimes(1);
  });
});
