import { memo, type JSX, type ReactNode } from 'react';
import './MyGridContainer.css';

interface MyGridContainerProps {
    children?: ReactNode;
    className?: string;
}

const MyGridContainer = ({ children, className = 'my-grid' }: MyGridContainerProps): JSX.Element => {
    return <div className={className}>{children}</div>;
};

MyGridContainer.displayName = 'MyGridContainer';

export default memo(MyGridContainer);