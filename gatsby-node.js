/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = ({boundActionCreators, graphql}) => {
    const { createPage } = boundActionCreators;

    const postTemplate = path.resolve('src/templates/posts.js');

    return graphql(`{
        allMarkdownRemark {
            edges {
                node {
                    html
                    id
                    frontmatter {
                        path
                        title
                        date
                    }
                }
            }
        }
    }`)
    .then(result => {
        if(result.errors) {
            return Promise.reject(res.errors);
        }
        result.data.allMarkdownRemark.edges.forEach(({node}) => {
            console.log(node);
            createPage({
                path: node.frontmatter.path,
                component: postTemplate
            })
        })
    })
}