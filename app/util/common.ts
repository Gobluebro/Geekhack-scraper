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
    return value.replace(/([A-Z])/g, ' $1').trim();
}
