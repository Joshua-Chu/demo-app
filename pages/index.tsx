import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import { getAuthors, getPosts } from '../lib/graphcms'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

const Home = () => {
  //   console.log('authors', authors.authors)
  //   console.log('authors', authors)

  return (
    <>
      <div></div>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   //   const authors = await getAuthors()
//   //   const posts = await getPosts()
//   //   const newPosts = await Promise.all(
//   //     posts.posts.map(async (post) => {
//   //       return {
//   //         ...post,
//   //         source: await serialize(post.description.markdown),
//   //       }
//   //     })
//   //   )

//   //   console.log(newPosts)
//   return {
//     props: {
//       authors: 'authors',
//       posts: '',
//     },
//     revalidate: 3,
//   }
// }

export default Home
