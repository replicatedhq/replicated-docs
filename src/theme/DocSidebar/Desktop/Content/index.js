/**
 * Custom DocSidebar Desktop Content: product heading, installer version selector,
 * and slide+fade transition when switching between main and product sidebars.
 */
import React, { useState } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import {
  useAnnouncementBar,
  useScrollPosition,
} from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import DocSidebarItems from '@theme/DocSidebarItems';
import InstallerVersionSelector from '@site/src/components/InstallerVersionSelector';
import { getProductForPath } from '@site/src/utils/sidebarProductFromPath';
import styles from './styles.module.css';

function useShowAnnouncementBar() {
  const { isActive } = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);
  useScrollPosition(
    ({ scrollY }) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive]
  );
  return isActive && showAnnouncementBar;
}

export default function DocSidebarDesktopContent({ path, sidebar, className }) {
  const showAnnouncementBar = useShowAnnouncementBar();
  const product = getProductForPath(path);
  const sidebarKey = product?.key ?? 'main';

  return (
    <div
      key={sidebarKey}
      data-sidebar={sidebarKey}
      className={styles.sidebarContentTransition}
    >
      {product && (
        <h2 className={styles.sidebarProductHeading}>{product.name}</h2>
      )}
      {product?.key === 'installer' && <InstallerVersionSelector />}
      <nav
        aria-label={translate({
          id: 'theme.docs.sidebar.navAriaLabel',
          message: 'Docs sidebar',
          description: 'The ARIA label for the sidebar navigation',
        })}
        className={clsx(
          'menu thin-scrollbar',
          styles.menu,
          showAnnouncementBar && styles.menuWithAnnouncementBar,
          className
        )}
      >
        <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
          <DocSidebarItems items={sidebar} activePath={path} level={1} />
        </ul>
      </nav>
    </div>
  );
}