export const formatDateString = (dateString: string): string => {
  if (!dateString) return "-";
  const date = new Date(dateString);

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${time} ${month} ${year}`; // e.g. "08:00 AM June 2025"
};
