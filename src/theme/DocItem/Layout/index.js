import React from 'react';
import clsx from 'clsx';
import {useWindowSize} from '@docusaurus/theme-common';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

// We'll lazy-load our component
const CopyMarkdownWrapper = () => {
  return (
    <BrowserOnly>
      {() => {
        const CopyMarkdown = require('../../../components/CopyMarkdown').default;
        return <CopyMarkdown />;
      }}
    </BrowserOnly>
  );
};

// We're going to get the title from the existing h1 on the page
const DocHeader = () => {
  return (
    <header className={styles.docHeader}>
      <BrowserOnly>
        {() => {
          // This will be executed only in the browser
          // Find the original h1 and clone its content here
          const h1 = document.querySelector('.theme-doc-markdown h1');
          const title = h1 ? h1.textContent : 'Documentation';
          
          // Hide the original h1
          if (h1) {
            h1.style.display = 'none';
          }
          
          return (
            <>
              <h1 className={styles.docTitle}>{title}</h1>
              <div className={styles.docHeaderActions}>
                <CopyMarkdownWrapper />
              </div>
            </>
          );
        }}
      </BrowserOnly>
    </header>
  );
};

// A simplified version without depending on internal hooks
export default function DocItemLayout({children}) {
  const windowSize = useWindowSize();

  // Only show TOC on desktop viewports
  const showTocDesktop = windowSize === 'desktop' || windowSize === 'ssr';

  return (
    <div className="row">
      <div className={clsx('col', styles.docItemCol)}>
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            <DocItemTOCMobile />
            <DocHeader />
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {showTocDesktop && <div className="col col--3"><DocItemTOCDesktop /></div>}
    </div>
  );
} 