// src/utils/deviceUtils.ts
import { theme } from "antd";

const { defaultAlgorithm, defaultSeed } = theme;
const mapToken = defaultAlgorithm(defaultSeed);

// Get all the available theme colors from Ant Design
const themeColors = Object.entries(mapToken)
  .filter(
    ([key, value]) =>
      // Filter to get only the main color tokens (blue6, red6, etc.)
      key.endsWith("6") &&
      typeof value === "string" &&
      !key.includes("neutral") &&
      !key.includes("gray")
  )
  .map(([key, value]) => ({
    color: value,
    // Get the corresponding light version (blue1, red1, etc.)
    background: mapToken[
      key.replace("6", "1") as keyof typeof mapToken
    ] as string,
  }));

export const getTypeColor = (
  type: string
): { color: string; background: string } => {
  // Create a hash of the type string for consistent color assignment
  const hash = type.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  // Use the hash to consistently select a color pair from the available theme colors
  const colorIndex = Math.abs(hash) % themeColors.length;
  return themeColors[colorIndex];
};

export const getTypeLabel = (type: string): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};
