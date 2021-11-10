import { graphql } from 'gatsby'
import React from 'react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

export const pageQuery = graphql`
  query DocPageQueryShadow {
    allAsciidoc {
      edges {
        node {
          html
          document {
            title
            subtitle
            main
          }
          author {
            lastName
            middleName
            authorInitials
            email
          }
        }
      }
    }
  }
`

export default function Page({ data }) {
  console.log(data)
  const html = data.allAsciidoc?.edges?.[0]?.node?.html
  return <div dangerouslySetInnerHTML={{ __html: html }}/>
}
