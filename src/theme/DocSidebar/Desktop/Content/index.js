/**
 * Custom DocSidebar Desktop Content: version selector for embedded cluster docs
 * and slide+fade transition when switching between main and embedded cluster sidebars.
 */
import React, { useState, useRef, useEffect } from 'react';
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

const ANIMATION_MS = 200;

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

const SIDEBAR_KEY_STORAGE = 'docsSidebarKey';

function useSidebarTransition(sidebarKey) {
  const [animate, setAnimate] = useState(() => {
    if (typeof sessionStorage === 'undefined') return false;
    const prev = sessionStorage.getItem(SIDEBAR_KEY_STORAGE);
    if (!prev || prev === sidebarKey) return false;
    const wasMain = prev === 'main';
    const isMain = sidebarKey === 'main';
    return wasMain || isMain;
  });

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(SIDEBAR_KEY_STORAGE, sidebarKey);
    }
  }, [sidebarKey]);

  useEffect(() => {
    if (!animate) return;
    const id = setTimeout(() => setAnimate(false), ANIMATION_MS);
    return () => clearTimeout(id);
  }, [animate]);

  return animate;
}

export default function DocSidebarDesktopContent({ path, sidebar, className }) {
  const showAnnouncementBar = useShowAnnouncementBar();
  const product = getProductForPath(path);
  const sidebarKey = product?.key ?? 'main';
  const shouldAnimate = useSidebarTransition(sidebarKey);

  return (
    <div
      data-sidebar={sidebarKey}
      data-animate={shouldAnimate ? 'true' : undefined}
      className={styles.sidebarContentTransition}
    >
      {product?.key === 'embedded-cluster' && <InstallerVersionSelector />}
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
