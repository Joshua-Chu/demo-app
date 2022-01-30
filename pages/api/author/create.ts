import { GraphQLClient, gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'

const urlEndpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string
export const client = new GraphQLClient(urlEndpoint, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_MUTATION_TOKEN}`,
  },
})

export default async function createAuthor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = req.body

  try {
    const mutation = gql`
      mutation CreateAuthor(
        $username: String!
        $password: String!
        $imageUrl: String!
      ) {
        createAuthor(
          data: {
            username: $username
            password: $password
            imageUrl: $imageUrl
          }
        ) {
          id
          username
          imageUrl
        }
      }
    `
    const data = await client.request(mutation, params)

    const publishMutation = gql`
      mutation PublishAuthor($id: ID!) {
        publishAuthor(where: { id: $id }, to: PUBLISHED) {
          id
        }
      }
    `

    await client.request(publishMutation, { id: data.createAuthor.id })
    return res.status(200).json({ user: data })
  } catch (error: any) {
    return res
      .status(error.response.status)
      .json({ error: error.response.errors })
  }
}
