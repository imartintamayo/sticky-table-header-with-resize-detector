import { ReactNode, useCallback, useRef } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import styles from './stickyTable.module.scss';
import cx from 'clsx';

type StickyTableProps = {
  renderHeaders: () => ReactNode;
  renderRows: () => ReactNode;
  className?: string;
  onHeaderHeightChange?: (height: number) => void;
  headerHeight?: number;
};

const StickyTable: React.FC<StickyTableProps> = ({
  renderHeaders,
  renderRows,
  className,
  onHeaderHeightChange,
  headerHeight,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const onResize = useCallback(
    (width?: number, height?: number) =>
      height && onHeaderHeightChange && onHeaderHeightChange(height),
    [onHeaderHeightChange]
  );

  return (
    <ScrollSync>
      <div className={cx(styles.table, className)}>
        <div ref={ref} className={styles.sticky}>
          <ScrollSyncPane group="horizontal">
            <div className={styles.container}>
              <table style={{ height: headerHeight }}>
                <thead>{renderHeaders()}</thead>
              </table>
            </div>
          </ScrollSyncPane>
          {onHeaderHeightChange && (
            <ReactResizeDetector
              onResize={onResize}
              handleWidth={false}
              targetRef={ref}
            />
          )}
        </div>
        <ScrollSyncPane group="horizontal">
          <div className={styles.container}>
            <table>
              <tbody>{renderRows()}</tbody>
            </table>
          </div>
        </ScrollSyncPane>
      </div>
    </ScrollSync>
  );
};

export default StickyTable;
