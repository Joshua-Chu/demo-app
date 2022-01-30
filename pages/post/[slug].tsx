import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import * as timeago from 'timeago.js'
import { getPostBySlug, getPosts } from '../../lib/graphcms'
import { Post } from '../../types'

type PostDetailProps = {
  data: { post: Post }
}

const PostDetail = ({ data }: PostDetailProps) => {
  const { post } = data

  const timeCreated = useMemo(() => {
    return timeago.format(post.createdAt)
  }, [post.createdAt])

  return (
    <>
      <Head>
        <title>{post.title} | Demo app</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} key="twtitle" />
        <meta
          name="twitter:description"
          content={post.description}
          key="twdescription"
        />
        <meta name="twitter:image" content={post.imageUrl} key="twimage" />
      </Head>
      <main className="h-screen pt-[88px]">
        <div className="flex h-full flex-col md:flex-row">
          <div className="flex  basis-3/6 items-center justify-center bg-black px-4 md:basis-3/5">
            <div className="relative h-96 w-96 lg:h-[450px] lg:w-[450px]">
              <Image src={post.imageUrl} layout="fill" />
            </div>
          </div>
          <div className="flex  basis-3/6 flex-col overflow-y-scroll bg-neutral-900 px-4 py-8 text-gray-400 sm:px-8 md:basis-2/5 md:px-12">
            <div className="mb-6">
              <Link href={`/profile/${post.author.username}`}>
                <a className="flex max-w-fit cursor-pointer items-center">
                  {post.author.imageUrl && (
                    <div className="relative h-14 w-14">
                      <Image
                        src={post.author.imageUrl}
                        layout="fill"
                        className="rounded-full"
                      />
                    </div>
                  )}
                  <div className="flex flex-col  pl-4 text-left">
                    <h2 className="text-blue-600">@{post.author.username}</h2>
                    <p>{timeCreated}</p>
                  </div>
                </a>
              </Link>
            </div>
            <h1 className="mb-8 border-b-2 border-blue-600 pb-4 text-white">
              {post.title}
            </h1>
            <div>
              <h3 className="mb-2 text-lg font-bold text-blue-600">
                Description
              </h3>
              <p className=" leading-6 ">{post.description}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts()
  const paths = posts.posts.map((post) => {
    return {
      params: { slug: post.slug },
    }
  })
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const data = await getPostBySlug(slug)

  return {
    props: {
      data,
    },
    revalidate: 10,
  }
}

export default PostDetail
