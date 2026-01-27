import React from 'react';
import {useThemeConfig, ErrorCauseBoundary} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import styles from './styles.module.css';

function useNavbarItems() {
  return useThemeConfig().navbar.items;
}

function NavbarItems({items}: {items: any[]}) {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarContentLayout() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);

  return (
    <>
      {/* First Row: Logo and Search */}
      <div className={styles.navbarRow1}>
        {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
        <NavbarLogo />
        <div className={styles.navbarRow1Right}>
          <NavbarSearch>
            <SearchBar />
          </NavbarSearch>
          <NavbarColorModeToggle className={styles.colorModeToggle} />
        </div>
      </div>

      {/* Second Row: Navigation Items */}
      <div className={styles.navbarRow2}>
        <div className={styles.navbarItemsLeft}>
          <NavbarItems items={leftItems} />
        </div>
        <div className={styles.navbarItemsRight}>
          <NavbarItems items={rightItems} />
        </div>
      </div>
    </>
  );
}

export default function NavbarContent(): JSX.Element {
  return <NavbarContentLayout />;
}
