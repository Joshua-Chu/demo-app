import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import { getAuthors, getPosts } from '../lib/graphcms'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'

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
    <div className="container mx-auto mt-20 flex flex-col ">
      <div>Search</div>
      <div className="grid-col-1 mx-auto  grid max-w-7xl gap-8  md:grid-cols-2 xl:grid-cols-3">
        {data.posts.map((post) => (
          <div key={post.id} className="flex justify-center ">
            <div className="h-fit w-full max-w-[350px] border-2 border-gray-200 shadow-lg">
              <div className="relative h-72 w-full ">
                <Image
                  src={post.imageUrl}
                  layout="fill"
                  className="rounded-t-xl"
                />
              </div>

              <div className="flex min-h-[150px] flex-col gap-2 rounded-b-xl bg-blue-50 p-6 text-gray-600">
                <h3 className="text-xl font-bold text-blue-600">
                  {post.title}
                </h3>
                <p className="font-bold">Created by: @{post.author.username}</p>
                <p className="break-words">
                  {post.description.length > 80
                    ? post.description.slice(80) + '...'
                    : post.description}
                </p>
                <div></div>
                <button className="self-end rounded-lg bg-blue-600">
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
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
