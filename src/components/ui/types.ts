import { ReactNode } from 'react';

export enum Sizes {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export interface LogoProps {
  size?: Sizes;
}

// Паттерн: Children types - поддержка разных типов children
export interface ModalProps {
  isOpen: boolean;
  children: ReactNode | ReactNode[] | ((onClose: () => void) => ReactNode);
  onClose: () => void;
  size?: Sizes;
  title?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}
