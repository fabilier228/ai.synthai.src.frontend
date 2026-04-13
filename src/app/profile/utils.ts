export const formatDate = (value: unknown): string => {
  if (value === null || value === undefined) return "N/A";

  let date: Date;

  if (typeof value === "number") {
    // timestamp in ms
    date = new Date(value);
  } else if (typeof value === "string") {
    // check if this is a number as a string
    const asNumber = Number(value);
    if (!Number.isNaN(asNumber) && value.trim() !== "") {
      date = new Date(asNumber);
    } else {
      // ISO string / other format accepted by Date
      date = new Date(value);
    }
  } else {
    return "N/A";
  }

  if (Number.isNaN(date.getTime())) return "N/A";

  // Polish date format, e.g. 01.12.2025, 19:17
  return date.toLocaleString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "text-success";
    case "Premium":
      return "text-warning";
    case "Email Unverified":
      return "text-error";
    default:
      return "text-text";
  }
};
