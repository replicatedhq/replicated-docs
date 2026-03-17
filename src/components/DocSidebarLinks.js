/**
 * DocSidebarLinks
 *
 * Renders links above the page-level mini TOC (and on mobile above the "On this page" dropdown):
 * - View as Markdown
 * - Edit this page (when editUrl is available)
 * - Open a docs issue
 */

import React from 'react';
import { useLocation } from '@docusaurus/router';
import PullRequestIcon from '../../static/images/git-pull-request.svg';
import ReportIcon from '../../static/images/report.svg';
import styles from './DocSidebarLinks.module.css';

function getMarkdownPath(pathname) {
  const normalizedPath =
    pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  return normalizedPath === '/' ? '/intro.mdx' : `${normalizedPath}.md`;
}

function MarkdownMarkIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 208 128"
      width="20"
      height="14"
      aria-hidden="true"
    >
      <g fill="currentColor">
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="m15 10c-2.7614 0-5 2.2386-5 5v98c0 2.761 2.2386 5 5 5h178c2.761 0 5-2.239 5-5v-98c0-2.7614-2.239-5-5-5zm-15 5c0-8.28427 6.71573-15 15-15h178c8.284 0 15 6.71573 15 15v98c0 8.284-6.716 15-15 15h-178c-8.28427 0-15-6.716-15-15z"
        />
        <path d="m30 98v-68h20l20 25 20-25h20v68h-20v-39l-20 25-20-25v39zm125 0-30-33h20v-35h20v35h20z" />
      </g>
    </svg>
  );
}

export default function DocSidebarLinks({ editUrl }) {
  const location = useLocation();
  const markdownPath = getMarkdownPath(location.pathname);

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const issueTitle = typeof window !== 'undefined' ? url.substring(url.lastIndexOf('/') + 1) : '';
  const issueHref =
    typeof window !== 'undefined'
      ? `https://github.com/replicatedhq/replicated-docs/issues/new?title=${encodeURIComponent(`Docs feedback on ${issueTitle}`)}&body=${encodeURIComponent(`URL: ${url}\nFeedback details:`)}`
      : '#';

  return (
    <nav className={styles.sidebarLinks} aria-label="Doc actions">
      <a href={markdownPath} target="_blank" rel="noopener noreferrer" className={styles.link}>
        <MarkdownMarkIcon className={styles.logo} />
        <span className={styles.text}>View as Markdown</span>
      </a>
      {editUrl && (
        <a href={editUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
          <PullRequestIcon className={styles.icon} />
          <span className={styles.text}>Edit this page</span>
        </a>
      )}
      <a href={issueHref} target="_blank" rel="noopener noreferrer" className={styles.link}>
        <ReportIcon className={styles.icon} />
        <span className={styles.text}>Open a docs issue</span>
      </a>
    </nav>
  );
}
