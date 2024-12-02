import React from "react";
import { Resizable } from "react-resizable";
import { ResizableHeaderProps } from "../types/resizable-header.types";
import "react-resizable/css/styles.css";

export const ResizableHeader: React.FC<ResizableHeaderProps> = ({
  width,
  onResize,
  ...restProps
}) => {
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => e.stopPropagation()}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};
