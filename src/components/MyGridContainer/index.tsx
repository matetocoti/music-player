import { memo, type JSX, type ReactElement } from 'react';
import SongBox from '../SongBox';

type SongBoxElement = ReactElement<React.ComponentProps<typeof SongBox>, typeof SongBox>;

interface MyGridContainerProps {
  children?: SongBoxElement | SongBoxElement[];
  className?: string;
}

const MyGridContainer = ({ children, className }: MyGridContainerProps): JSX.Element => {
  return (
    <div className={`grid gap-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 ${className ?? ''}`.trim()}>
      {children}
    </div>
  );
};

MyGridContainer.displayName = 'MyGridContainer';

export default memo(MyGridContainer);