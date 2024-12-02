import { useCallback, useState } from "react";
import { ResizeCallbackData } from "react-resizable";
import { initialColumnWidths } from "../constants/transport-types";

export const useColumnResize = (
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const [columnWidths, setColumnWidths] =
    useState<Record<string, number>>(initialColumnWidths);

  const handleResize = useCallback(
    (key: string) =>
      (_: React.SyntheticEvent, { size }: ResizeCallbackData) => {
        if (!containerRef.current) return;

        const containerWidth = containerRef.current.clientWidth;
        const columnKeys = Object.keys(columnWidths);
        const currentIndex = columnKeys.indexOf(key);

        const minWidth = 40;
        const newWidth = Math.max(minWidth, size.width);
        const leftColumnsWidth = columnKeys
          .slice(0, currentIndex)
          .reduce((sum, k) => sum + columnWidths[k], 0);

        const availableWidth = containerWidth - leftColumnsWidth - newWidth;
        const rightColumns = columnKeys.slice(currentIndex + 1);

        if (rightColumns.length === 0) return;

        const rightColumnsTotalWidth = rightColumns.reduce(
          (sum, k) => sum + columnWidths[k],
          0
        );
        const rightColumnsRatio = availableWidth / rightColumnsTotalWidth;

        const newWidths = { ...columnWidths };
        newWidths[key] = newWidth;

        rightColumns.forEach((colKey) => {
          newWidths[colKey] = Math.max(
            minWidth,
            Math.floor(columnWidths[colKey] * rightColumnsRatio)
          );
        });

        setColumnWidths(newWidths);
      },
    [columnWidths, containerRef]
  );

  return { columnWidths, setColumnWidths, handleResize };
};
