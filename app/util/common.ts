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

// Function to deal with weird bug with react and nextjs
export const jsonify = (value: any) => {
  return JSON.parse(JSON.stringify(value));
};

export const formatEnum = (value: string) => {
  return value.replace(/([A-Z])/g, " $1").trim();
};

export const sortDate = (
  dateA: Date | string | null,
  dateB: Date | string | null
) => {
  if (dateA === dateB) return 0;
  if (dateA === null) return -1;
  if (dateB === null) return 1;

  if (typeof dateA === "string") dateA = new Date(dateA);
  if (typeof dateB === "string") dateB = new Date(dateB);

  return dateA.getTime() - dateB.getTime();
};
