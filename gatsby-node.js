async function createPages({ graphql, actions, reporter }) {
  console.log('RAN INSIDE')
  const { createPage, createRedirect } = actions

  const { data, errors } = await graphql(`
    query {
      allAsciidoc {
        edges {
          node {
            id
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
  `)

  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create pages
  data.allAsciidoc.edges.forEach(({ node }) => {
    console.log(node)
    createPage({
      path: node.fields.slug,
      component: path.resolve(
        __dirname,
        `./src/templates/doc.js`,
      ),
      context: {
        id: node.id,
      },
    })
  })
}
