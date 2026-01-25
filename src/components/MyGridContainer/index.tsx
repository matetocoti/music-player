import { memo, type JSX, type ReactElement } from 'react';
import SongBox from '../SongBox';
import './MyGridContainer.css';

type SongBoxElement = ReactElement<React.ComponentProps<typeof SongBox>, typeof SongBox>;

interface MyGridContainerProps {
    children?: SongBoxElement | SongBoxElement[];
    className?: string;
}

const MyGridContainer = ({ children, className = 'my-grid' }: MyGridContainerProps): JSX.Element => {
    return <div className={className}>{children}</div>;
};

MyGridContainer.displayName = 'MyGridContainer';

export default memo(MyGridContainer);