/**
 * Custom DocSidebar Mobile: product heading and installer version selector
 * when the user is on an installer docs page.
 */
import React from 'react';
import clsx from 'clsx';
import {
  NavbarSecondaryMenuFiller,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import DocSidebarItems from '@theme/DocSidebarItems';
import InstallerVersionSelector from '@site/src/components/InstallerVersionSelector';
import { getProductForPath } from '@site/src/utils/sidebarProductFromPath';

const DocSidebarMobileSecondaryMenu = ({ sidebar, path }) => {
  const mobileSidebar = useNavbarMobileSidebar();
  const product = getProductForPath(path);

  return (
    <>
      {product && (
        <h2 className="sidebar-product-heading-mobile">{product.name}</h2>
      )}
      {product?.key === 'installer' && (
        <div style={{ padding: '0.5rem 1rem' }}>
          <InstallerVersionSelector />
        </div>
      )}
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems
          items={sidebar}
          activePath={path}
          onItemClick={(item) => {
            if (item.type === 'category' && item.href) {
              mobileSidebar.toggle();
            }
            if (item.type === 'link') {
              mobileSidebar.toggle();
            }
          }}
          level={1}
        />
      </ul>
    </>
  );
};

function DocSidebarMobile(props) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

export default React.memo(DocSidebarMobile);