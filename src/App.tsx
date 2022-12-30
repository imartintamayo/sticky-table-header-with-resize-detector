import logo from './logo.svg';
import styles from './app.module.scss';
import StickyTable from './components/StickyTable';
import cx from 'clsx';
import { useCallback, useMemo, useState } from 'react';

function App() {
  const headers = useMemo(() => Array.from(Array(10).keys()), []);
  const rows = useMemo(() => Array.from(Array(20).keys()), []);

  const [showLogo, setShowLogo] = useState(false);
  const [leftTableHeaderHeight, setLeftTableHeaderHeight] = useState(0);

  const renderHeaders = useCallback(
    () => (
      <tr>
        {headers.map((header) => (
          <th key={`header#${header}`}>Header {header}</th>
        ))}
      </tr>
    ),
    [headers]
  );

  const renderRows = useCallback(
    () =>
      rows.map((row) => (
        <tr key={`row#${row}`}>
          {headers.map((header) => (
            <td key={`row-td#${header}`}>
              Row {row} (<img src={logo} className={styles.logo} alt="logo" />)
            </td>
          ))}
        </tr>
      )),
    [headers, rows]
  );

  const renderHeadersTableRight = useCallback(
    () => (
      <>
        <tr>
          {headers.map((header) => (
            <th key={`header#${header}`}>Header {header}</th>
          ))}
        </tr>

        {showLogo && (
          <tr>
            {headers.map((header) => (
              <th key={`header-icon#${header}`}>
                <img src={logo} className={styles.logo} alt="logo" />
              </th>
            ))}
          </tr>
        )}
      </>
    ),
    [showLogo, headers]
  );

  const onHeaderHeightChange = useCallback(
    (height: number) => setLeftTableHeaderHeight(height),
    [setLeftTableHeaderHeight]
  );

  return (
    <div className={styles.app}>
      <label>
        <input
          type="checkbox"
          checked={showLogo}
          onChange={(e) => setShowLogo(e.currentTarget.checked)}
        />
        Show logo on HEADERS
      </label>
      <div className={styles.container}>
        <StickyTable
          renderHeaders={renderHeaders}
          renderRows={renderRows}
          className={styles.table}
        />
      </div>
      <div className={cx(styles.container)}>
        <div className={cx(styles.tableWrapper)}>
          <StickyTable
            renderHeaders={renderHeaders}
            renderRows={renderRows}
            className={cx(styles.table, styles.tableLeft)}
            headerHeight={leftTableHeaderHeight}
          />
          <StickyTable
            renderHeaders={renderHeadersTableRight}
            renderRows={renderRows}
            className={cx(styles.table, styles.tableRight)}
            onHeaderHeightChange={onHeaderHeightChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
