import { clsx } from 'clsx';
import React, { useMemo } from 'react';
import './ResponsiveContainer.module.scss';
import { ResponsiveContainerProps } from './types';
import { useResizeObserver } from './useResizeObserver';

const DEFAULT_BREAKPOINTS = {
  small: 480,
  medium: 768,
  large: 1024,
};

const DEFAULT_COLUMNS = {
  small: 1,
  medium: 2,
  large: 3,
};

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  breakpoints = DEFAULT_BREAKPOINTS,
  renderMode = 'grid',
  columns = DEFAULT_COLUMNS,
  gap = 16,
  className,
  onResize,
  minHeight,
  maxHeight,
}) => {
  const { ref, size, breakpoint } = useResizeObserver(breakpoints, onResize);

  const containerStyle = useMemo(() => {
    const currentColumns = columns[breakpoint];

    const style: React.CSSProperties = {
      gap: `${gap}px`,
      minHeight: minHeight ? `${minHeight}px` : undefined,
      maxHeight: maxHeight ? `${maxHeight}px` : undefined,
    };

    if (renderMode === 'grid') {
      style.display = 'grid';
      style.gridTemplateColumns = `repeat(${currentColumns}, 1fr)`;
    } else if (renderMode === 'list') {
      style.display = 'flex';
      style.flexDirection = 'column';
    } else if (renderMode === 'cards') {
      style.display = 'flex';
      style.flexWrap = 'wrap';
      style.justifyContent = 'space-between';
    }

    return style;
  }, [breakpoint, columns, gap, renderMode, minHeight, maxHeight]);

  const containerClasses = clsx(
    'responsive-container',
    `responsive-container--${renderMode}`,
    `responsive-container--${breakpoint}`,
    className
  );

  return (
    <div
      ref={ref}
      className={containerClasses}
      style={containerStyle}
      data-testid="responsive-container"
      data-breakpoint={breakpoint}
      data-width={size.width}
      data-height={size.height}
    >
      {children}
    </div>
  );
};

export default ResponsiveContainer;
