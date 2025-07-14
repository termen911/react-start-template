import { useCallback, useEffect, useRef, useState } from 'react';
import { BreakpointSize, ContainerSize, UseResizeObserverResult } from './types';

const DEFAULT_BREAKPOINTS = {
  small: 480,
  medium: 768,
  large: 1024,
};

export const useResizeObserver = (
  breakpoints = DEFAULT_BREAKPOINTS,
  onResize?: (width: number, height: number) => void
): UseResizeObserverResult => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<ContainerSize>({ width: 0, height: 0 });
  const [breakpoint, setBreakpoint] = useState<BreakpointSize>('small');

  const getBreakpoint = useCallback(
    (width: number): BreakpointSize => {
      if (width >= breakpoints.large) return 'large';
      if (width >= breakpoints.medium) return 'medium';
      return 'small';
    },
    [breakpoints]
  );

  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!entries.length) return;

      const entry = entries[0];
      const { width, height } = entry.contentRect;

      const newSize = { width, height };
      const newBreakpoint = getBreakpoint(width);

      setSize(newSize);
      setBreakpoint(newBreakpoint);

      if (onResize) {
        onResize(width, height);
      }
    },
    [getBreakpoint, onResize]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Создаем ResizeObserver
    const observer = new ResizeObserver(handleResize);

    // Наблюдаем за элементом
    observer.observe(element);

    // Устанавливаем начальные размеры
    const rect = element.getBoundingClientRect();
    setSize({ width: rect.width, height: rect.height });
    setBreakpoint(getBreakpoint(rect.width));

    // Очищаем observer при размонтировании
    return () => {
      observer.disconnect();
    };
  }, [handleResize, getBreakpoint]);

  return { ref, size, breakpoint };
};
