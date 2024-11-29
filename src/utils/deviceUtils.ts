export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    default: "default",
    thermostat: "blue",
  };
  return typeColors[type] || "default";
};

export const getTypeLabel = (type: string): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};
