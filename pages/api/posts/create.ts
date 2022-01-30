import { GraphQLClient, gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'

const urlEndpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string
export const client = new GraphQLClient(urlEndpoint, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_MUTATION_TOKEN}`,
  },
})

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = req.body

  try {
    const mutation = gql`
      mutation CreatePost(
        $slug: String!
        $username: String!
        $imageUrl: String!
        $title: String!
        $description: String!
      ) {
        createPost(
          data: {
            title: $title
            description: $description
            imageUrl: $imageUrl
            author: { connect: { username: $username } }
            slug: $slug
          }
        ) {
          id
          slug
        }
      }
    `
    const data = await client.request(mutation, params)
    console.log('data', data)

    const publishPost = gql`
      mutation PublishPost($id: ID!) {
        publishPost(where: { id: $id }, to: PUBLISHED) {
          id
        }
      }
    `

    await client.request(publishPost, { id: data.createPost.id })
    return res.status(200).json({ success: true })
  } catch (error: any) {
    return res
      .status(error.response.status)
      .json({ error: error.response.errors })
  }
}
