export const formatUnixTimestamp = (timestamp: string | number): string => {
  const date = new Date(
    typeof timestamp === "string" ? Number(timestamp) : timestamp
  );
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const formatPartitionTimestamp = (
  timestamp: string | number
): string => {
  const date = new Date(
    typeof timestamp === "string" ? Number(timestamp) : timestamp
  );
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};
