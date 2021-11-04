module.exports = {
  siteMetadata: {
        title: `Replicated Docs`,
        siteUrl: `https://www.gatsbyjs.com`,
        description: `Blazing fast modern site generator for React`,
    },
  plugins: [
    {
      resolve: "smooth-doc",
      options: {
        name: "Smooth DOC Starter",
        description: "Use your own description...",
        siteUrl: "https://example.com",
      },
    },
  ],
};
