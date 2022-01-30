import { gql } from 'graphql-request'
import { GraphQLClient } from 'graphql-request'

const urlEndpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string
export const client = new GraphQLClient(urlEndpoint)

export const getAuthors = async () => {
  const query = gql`
    query getAuthors {
      authors {
        id
        imageUrl
        username
        password
      }
    }
  `

  const result = await client.request(query)
  return result
}

export const getPosts = async () => {
  const query = gql`
    query getPosts {
      posts {
        id
        createdAt
        imageUrl
        slug
        description
        stage
        title
        author {
          id
          username
          imageUrl
        }
      }
    }
  `

  const result = await client.request(query)
  return result
}

export const getPostsOfUser = async (username: string) => {
  console.log('username', username)
  const query = gql`
    query getPosts($username: String!) {
      posts(where: { author: { username: $username } }) {
        author {
          imageUrl
          username
        }
        description
        id
        imageUrl
        slug
        title
        createdAt
      }
    }
  `

  const result = await client.request(query, { username: username })

  return result
}
