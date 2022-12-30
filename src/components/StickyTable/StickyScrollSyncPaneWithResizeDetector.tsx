import { withResizeDetector } from 'react-resize-detector';
import { ReactNode } from 'react';
import { ScrollSyncPane } from 'react-scroll-sync';
import styles from './stickyTable.module.scss';

type StickyScrollSyncPaneProps = {
  children: ReactNode;
  targetRef?: React.RefObject<HTMLDivElement>;
  handleHeight?: boolean;
  handleWidth?: boolean;
//   onResize?: (width?: number, height?: number) => void;
};

// const StickyScrollSyncPaneWithResizeDetector: React.FC<StickyScrollSyncPaneWithResizeDetectorProps> = ({renderHeaders,
//     onHeaderHeightChange,
//     headerHeight, targetRef }) => {
//     return (
//         //<div ref={targetRef}>{`${width}x${height}`}</div>
//         <div ref={targetRef} className={styles.sticky}>
//           <ScrollSyncPane group="horizontal">
//             <div className={styles.container}>
//               <table style={{ height: headerHeight }}>
//                 <thead>{renderHeaders()}</thead>
//               </table>
//             </div>
//           </ScrollSyncPane>
//           {onHeaderHeightChange && (
//             <ReactResizeDetector
//               onResize={(width?: number, height?: number) =>
//                 height && onHeaderHeightChange(height)
//               }
//               handleWidth={false}
//               targetRef={ref}
//             />
//           )}
//         </div>
//     );
// };

export const StickyScrollSyncPane: React.FC<StickyScrollSyncPaneProps> = ({
  children,
  ...rest
}) => {
  return (
    <div className={styles.sticky} {...rest}>
      <ScrollSyncPane group="horizontal">{children}</ScrollSyncPane>
    </div>
  );
};

export const StickyScrollSyncPaneWithResizeDetector =
  withResizeDetector(StickyScrollSyncPane);
