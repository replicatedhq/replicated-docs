import React from 'react'
import { PageLayout } from 'smooth-doc/src/components/PageLayout'
import { DocLayout } from 'smooth-doc/src/components/DocLayout'

export function PageWrapper({
  children,
  props: {
    data: { mdx, allAsciidoc },
  },
}) {
  // Assumes any asciidoc page is a docs page, will need to
  // be updated if non-docs pages also use asciidoc
  if (allAsciidoc) {
    console.log('ran')
    return (
      <DocLayout title={allAsciidoc?.edges?.[0]?.node?.document?.title}>
        {children}
      </DocLayout>
    )
  }
  // For now leaving the original mdx implementation below
  // for reference
  if (!mdx?.fields?.pageType) return children
  switch (mdx.fields.pageType) {
    case 'doc':
      return (
        <DocLayout
          title={mdx.fields.title}
          tableOfContents={mdx.tableOfContents}
          editLink={mdx.fields.editLink}
        >
          {children}
        </DocLayout>
      )
    case 'page':
      return <PageLayout title={mdx.fields.title}>{children}</PageLayout>
    default:
      return children
  }
}
