import { memo, type CSSProperties, type JSX, type ReactNode } from 'react';

interface MyGridContainerProps {
  children?: ReactNode; 
  className?: string;
  style?: CSSProperties;
}

const MyGridContainer = ({ children, className = '', style }: MyGridContainerProps): JSX.Element => {
  return (
    <div 
      style={style}
      className={`grid gap-1 ${className}`.trim()}
    >
      {children}
    </div>
  );
};
MyGridContainer.displayName = 'MyGridContainer';
export default memo(MyGridContainer);