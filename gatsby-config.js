const path = require('path')

module.exports = {
  siteMetadata: {
    title: `Replicated Docs`,
    siteUrl: `https://docs.replicated.com`,
    description: `Documentation site for Replicated.`,
  },
  plugins: [
    {
      resolve: `smooth-asciidoc`,
      options: {
        name: `Replicated Docs`,
        siteUrl: 'https://docs.replicated.com',
        description: `Documentation site for Replicated.`,
        baseDirectory: path.resolve(__dirname, '../'),
        sections: ['Asciidoc', 'About', 'Guides', 'Vendor', 'Admin console', 'Components', 'Reference'],
        navItems: [{ title: 'Docs', url: '/docs/getting-started/' }],
        twitterAccount: 'replicatedhq',
        githubRepositoryURL: 'https://github.com/replicatedhq/replicated-docs/',
      },
    },
  ],
};
