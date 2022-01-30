import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import { getAuthors, getPosts } from '../lib/graphcms'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'
import { Posts } from '../components/Posts'

const data = {
  posts: [
    {
      author: {
        username: 'j',
        imageUrl:
          'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643461037/Demo%20Uploads/x7o6ntt84nikm3h7dab9.jpg',
      },
      description: 'asd',
      id: 'ckz0imojc2ljz0c90xs8quu0b',
      imageUrl:
        'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643501953/Demo%20Uploads/aanye7ze0cvozqxrbhkn.png',
      slug: 'asd-ll',
      title: 'asd ll',
      createdAt: '2022-01-30T00:19:15.046645+00:00',
    },
    {
      author: {
        username: 'j',
        imageUrl:
          'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643461037/Demo%20Uploads/x7o6ntt84nikm3h7dab9.jpg',
      },
      description: 'Post one',
      id: 'ckz0o6xn42ugh0c90ac2nueni',
      imageUrl:
        'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643506502/Demo%20Uploads/o1g2frph9aa2qdsjmjmv.png',
      slug: 'post-one',
      title: 'Post One',
      createdAt: '2022-01-30T02:54:58.280268+00:00',
    },
    {
      author: {
        username: 'j',
        imageUrl:
          'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643461037/Demo%20Uploads/x7o6ntt84nikm3h7dab9.jpg',
      },
      description:
        'asdasindaisbdashibdasubdasudbasudbasudbasuhbdashdbasjhdbajshbdahjbdahjbdahjsbdahjbdhjabsdhjasbdhjasbdhjabsdhjabshdjabshjdbashjdbahjsdbahjsbdahjsbhjbdhjasbdhjabshjdbashjdbashjbdahjsbdhjasbdhjasbdhajsbdhjasbdhjabsd asjbdahjsbda  abjsdahjsbd hasbd ajsbdhajsbdhj',
      id: 'ckz0o7n3s2u6x0c8161771bvn',
      imageUrl:
        'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643506502/Demo%20Uploads/o1g2frph9aa2qdsjmjmv.png',
      slug: 'post-two',
      title: 'Post two',
      createdAt: '2022-01-30T02:55:31.518214+00:00',
    },
    {
      author: {
        username: 'j',
        imageUrl:
          'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643461037/Demo%20Uploads/x7o6ntt84nikm3h7dab9.jpg',
      },
      description:
        "I am joshua chu and I'm trying to make something work when I should have done this 3 days ago I am joshua chu and I'm trying to make something work when I should have done this 3 days agoI am joshua chu and I'm trying to make something work when I should have done this 3 days ago",
      id: 'ckz0oncow2vpr0d40v0ngzknx',
      imageUrl:
        'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643506502/Demo%20Uploads/o1g2frph9aa2qdsjmjmv.png',
      slug: 'another-one',
      title: 'Another One',
      createdAt: '2022-01-30T03:07:44.136533+00:00',
    },
  ],
}

const Home = () => {
  //   console.log('authors', authors.authors)
  //   console.log('authors', authors)

  return (
    <main className="bg-neutral-900">
      <Posts posts={data} />
    </main>
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
