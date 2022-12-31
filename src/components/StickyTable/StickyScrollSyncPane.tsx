import ReactResizeDetector from 'react-resize-detector';
import { ReactNode } from 'react';
import { ScrollSyncPane } from 'react-scroll-sync';
import styles from './stickyTable.module.scss';

type StickyScrollSyncPaneProps = {
  children: ReactNode;
  targetRef?: React.RefObject<HTMLDivElement>;
};

type StickyScrollSyncPaneWithResizeDetectorProps = StickyScrollSyncPaneProps & {
  handleHeight?: boolean;
  handleWidth?: boolean;
  onResize?: (width?: number, height?: number) => void;
};

export const StickyScrollSyncPane: React.FC<StickyScrollSyncPaneProps> = ({
  children,
  targetRef,
}) => {
  return (
    <div className={styles.sticky} ref={targetRef}>
      <ScrollSyncPane group="horizontal">{children}</ScrollSyncPane>
    </div>
  );
};

export const StickyScrollSyncPaneWithResizeDetector: React.FC<
  StickyScrollSyncPaneWithResizeDetectorProps
> = ({ children, targetRef, handleWidth, handleHeight, onResize }) => {
  return (
    <ReactResizeDetector
      handleWidth={handleWidth}
      handleHeight={handleHeight}
      onResize={onResize}
      targetRef={targetRef}
    >
      <StickyScrollSyncPane targetRef={targetRef}>
        {children}
      </StickyScrollSyncPane>
    </ReactResizeDetector>
  );
};
