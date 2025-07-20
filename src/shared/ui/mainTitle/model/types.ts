export interface MainTitleProps {
  title: string;
  onBack?: () => void;
  backText?: string;
  actions?: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5;
  style?: React.CSSProperties;
}
