// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Replicated Docs',
  tagline: 'Technical documentation for Replicated vendors and their enterprise end-customers.',
  url: 'https://docs.replicated.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'images/favicon.png',
  organizationName: 'replicatedhq', // Usually your GitHub org/user name.
  projectName: 'replicated-docs', // Usually your repo name.
  trailingSlash: false,

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: require.resolve('./sidebars.js'),
          breadcrumbs: false,
          // Please change this to your repo.
          editUrl: 'https://github.com/replicatedhq/replicated-docs/edit/main/',
          admonitions: {
            tag: ':::',
            keywords: ['note','important', 'tip', 'info', 'caution', 'danger'],
          },
          /**
          admonitions: {
            customTypes: {
              note: {
                keyword: `note`,
                infima: true,
                svg: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16"><path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>'
              },
              important: {
                keyword: `important`,
                infima: true,
                svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"></path></svg>'
              }
            }
          },
          */
        },
        googleAnalytics: {
          trackingID: 'UA-61420213-25',
          anonymizeIP: true,
        },
        gtag: {
          trackingID: 'GTM-W3BM5G5',
          anonymizeIP: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/replicatedhq/replicated-docs/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // The application ID provided by Algolia
        appId: 'BHWS2Z6GO0',

        // Public API key: it is safe to commit it
        apiKey: 'c1b3ad730ee08e83703eeaadd39c4790',
        indexName: 'docs',
        contextualSearch: true,
      },
      navbar: {
        title: 'Docs',
        logo: {
          alt: 'R',
          src: 'images/logo-replicated-red.png',
        },
        items: [
          {
            href: 'https://github.com/facebook/docusaurus',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Release Notes',
                to: 'release-notes/rn-whats-new',
              },
              {
                label: 'Getting Started Tutorials',
                to: 'vendor/tutorial-ui-setup',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discourse',
                href: 'https://community.replicated.com',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/replicatedhq',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'https://replicated.com/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/replicatedhq',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Replicated, Inc. All Rights Reserved.

`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
