import { ReactNode, useCallback, useMemo, useRef } from 'react';
import styles from './stickyTable.module.scss';
import {
  StickyScrollSyncPane,
  StickyScrollSyncPaneWithResizeDetector,
} from './StickyScrollSyncPane';

type StickySectionProps = {
  renderHeaders: () => ReactNode;
  onHeaderHeightChange?: (height: number) => void;
  headerHeight?: number;
};

const StickySection: React.FC<StickySectionProps> = ({
  renderHeaders,
  onHeaderHeightChange,
  headerHeight,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const onResize = useCallback(
    (width?: number, height?: number) =>
      height && onHeaderHeightChange && onHeaderHeightChange(height),
    [onHeaderHeightChange]
  );

  const stickySection = useMemo(
    () => (
      <div className={styles.container}>
        <table style={{ height: headerHeight }}>
          <thead>{renderHeaders()}</thead>
        </table>
      </div>
    ),
    [headerHeight, renderHeaders]
  );

  if (!onHeaderHeightChange) {
    return <StickyScrollSyncPane>{stickySection}</StickyScrollSyncPane>;
  }

  return (
    <StickyScrollSyncPaneWithResizeDetector
      targetRef={ref}
      handleWidth={false}
      handleHeight
      onResize={onResize}
    >
      {stickySection}
    </StickyScrollSyncPaneWithResizeDetector>
  );
};

export default StickySection;
