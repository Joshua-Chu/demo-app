import { GraphQLClient, gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'

const urlEndpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string
export const client = new GraphQLClient(urlEndpoint, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_MUTATION_TOKEN}`,
  },
})

export default async function loginAuthor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = req.body

  try {
    const query = gql`
      query getAuthor($username: String!) {
        author(where: { username: $username }) {
          id
          password
          imageUrl
          username
        }
      }
    `
    const data = await client.request(query, { username: params.username })

    if (data.author.password === params.password) {
      const { id, username, imageUrl } = data.author
      return res.status(200).json({ user: { id, username, imageUrl } })
    }
  } catch (error: any) {
    return res
      .status(error.response.status)
      .json({ error: error.response.errors })
  }
}
