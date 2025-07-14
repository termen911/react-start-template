export interface ResponsiveContainerProps {
  children: React.ReactNode;
  breakpoints?: {
    small: number;
    medium: number;
    large: number;
  };
  renderMode?: 'grid' | 'list' | 'cards';
  columns?: {
    small: number;
    medium: number;
    large: number;
  };
  gap?: number;
  className?: string;
  onResize?: (width: number, height: number) => void;
  minHeight?: number;
  maxHeight?: number;
}

export interface ContainerSize {
  width: number;
  height: number;
}

export type BreakpointSize = 'small' | 'medium' | 'large';

export interface UseResizeObserverResult {
  ref: React.RefObject<HTMLDivElement>;
  size: ContainerSize;
  breakpoint: BreakpointSize;
}
