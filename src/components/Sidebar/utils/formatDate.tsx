export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    // Return a default value or an error message
    return "Invalid Date";
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-GB", options).format(date);
}
