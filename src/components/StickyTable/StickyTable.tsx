import { ReactNode } from 'react';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import styles from './stickyTable.module.scss';
import cx from 'clsx';
import StickySection from './StickySection';

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
  return (
    <ScrollSync>
      <div className={cx(styles.table, className)}>
        <StickySection
          renderHeaders={renderHeaders}
          onHeaderHeightChange={onHeaderHeightChange}
          headerHeight={headerHeight}
        />

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
