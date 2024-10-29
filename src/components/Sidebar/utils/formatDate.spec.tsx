import { formatDate } from "./formatDate";

describe("formatDate Utility Function", () => {
  test("formats date string correctly", () => {
    const dateStr = "2023-10-05T14:48:00.000Z";
    const formattedDate = formatDate(dateStr);

    // Expected format is '05 October 2023' for 'en-GB' locale
    expect(formattedDate).toBe("05 October 2023");
  });

  test("handles invalid date strings gracefully", () => {
    const dateStr = "invalid-date";
    const formattedDate = formatDate(dateStr);

    // The function may return 'Invalid Date' or a default value
    expect(formattedDate).toBe("Invalid Date");
  });
});
