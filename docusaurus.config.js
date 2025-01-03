// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

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
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: require.resolve('./sidebars.js'),
          breadcrumbs: false,
          editUrl: 'https://github.com/replicatedhq/replicated-docs/edit/main/',
          admonitions: {
            keywords: ['note','important', 'tip', 'info', 'caution', 'danger'],
            extendDefaults: true,
          },
        },
        googleAnalytics: {
          trackingID: 'UA-61420213-25',
          anonymizeIP: true,
        },
        gtag: {
          trackingID: 'G-MBWBP4JW70',
          anonymizeIP: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  scripts: [
    {
      src:
        '/js/activecampaign.js',
      async: true,
    },
    {
      src:
        '/js/visitoranalytics.js',
      async: true,
    },
  ],
  
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
        },
      },
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
            type: 'dropdown',
            label: 'Release Notes',
            position: 'left',
            items: [
              {
                type: 'doc',
                docId: 'release-notes/rn-embedded-cluster',
                label: 'Embedded Cluster',
              },
              {
                type: 'doc',
                docId: 'release-notes/rn-app-manager',
                label: 'KOTS',
              },
              {
                type: 'doc',
                docId: 'release-notes/rn-kubernetes-installer',
                label: 'kURL',
              },
              {
                type: 'doc',
                docId: 'release-notes/rn-replicated-sdk',
                label: 'Replicated SDK',
              },
              {
                type: 'doc',
                docId: 'release-notes/rn-vendor-platform',
                label: 'Vendor Platform',
              },
            ],  
          },
          {
            type: 'dropdown',
            label: 'Product Docs',
            position: 'left',
            items: [
              {
                type: 'doc',
                docId: 'vendor/testing-about',
                label: 'Compatibility Matrix',
              },
              {
                type: 'doc',
                docId: 'vendor/embedded-overview',
                label: 'Embedded Cluster',
              },
              {
                type: 'doc',
                docId: 'intro-kots',
                label: 'KOTS',
              },
              {
                type: 'doc',
                docId: 'vendor/kurl-about',
                label: 'kURL',
              },
              {
                type: 'doc',
                docId: 'vendor/private-images-about',
                label: 'Replicated Proxy Registry',
              },
              {
                type: 'doc',
                docId: 'vendor/replicated-sdk-overview',
                label: 'Replicated SDK',
              },
              {
                type: 'doc',
                docId: 'vendor/vendor-portal-creating-account',
                label: 'Vendor Portal',
              },
            ],  
          },
          {
            type: 'dropdown',
            label: 'Developer Tools',
            position: 'left',
            items: [
              {
                type: 'doc',
                docId: 'reference/kots-cli-getting-started',
                label: 'KOTS CLI',
              },
              {
                type: 'doc',
                docId: 'reference/replicated-cli-installing',
                label: 'Replicated CLI',
              },
              {
                type: 'doc',
                docId: 'reference/replicated-sdk-apis',
                label: 'Replicated SDK API',
              },
              {
                type: 'doc',
                docId: 'reference/vendor-api-using',
                label: 'Vendor API v3',
              },
            ],  
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
                label: 'Replicated Onboarding',
                to: 'vendor/replicated-onboarding',
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
        copyright: `© ${new Date().getFullYear()} Replicated, Inc. All Rights Reserved.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ['bash'],
      },
    }),
};

module.exports = config;
