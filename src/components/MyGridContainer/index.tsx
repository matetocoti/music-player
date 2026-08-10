import { memo, type JSX, type ReactNode } from 'react';

interface MyGridContainerProps {
  children?: ReactNode; 
  className?: string;
}

const MyGridContainer = ({ children, className = '' }: MyGridContainerProps): JSX.Element => {
  return (
    <div 
      className={`grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 sm:gap-1 lg:gap-1 ${className}`.trim()}
    >
      {children}
    </div>
  );
};
MyGridContainer.displayName = 'MyGridContainer';
export default memo(MyGridContainer);