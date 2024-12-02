import { ResizeCallbackData } from "react-resizable";

export interface ResizableHeaderProps
  extends React.HTMLAttributes<HTMLElement> {
  width: number;
  onResize: (e: React.SyntheticEvent, data: ResizeCallbackData) => void;
}
