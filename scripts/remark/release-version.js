module.exports = function releaseVersion() {
  return (tree) => {
    for (const heading of tree.children) {
      if (heading.type !== 'heading' || heading.depth !== 2) continue;

      const marker = heading.children.at(-1);
      if (marker?.type !== 'mdxJsxTextElement' || marker.name !== 'span') continue;

      const version = marker.attributes.find((attribute) => attribute.name === 'data-release-version');
      if (typeof version?.value !== 'string') continue;

      // Docusaurus computes the anchor and TOC from the original heading text.
      heading.children.pop();
      heading.data ??= {};
      heading.data.hProperties ??= {};
      heading.data.hProperties['data-release-version'] = version.value;
    }
  };
};
