export const formatDate = (date: Date | string | null) => {
  if (typeof date === "string") date = new Date(date);
  return (
    date?.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }) || ""
  );
};
