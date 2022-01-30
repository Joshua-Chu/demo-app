import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import * as timeago from 'timeago.js'
import { getPostBySlug, getPosts } from '../../lib/graphcms'
import { Post } from '../../types'

const postData = {
  author: {
    username: 'j',
    imageUrl:
      'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643461037/Demo%20Uploads/x7o6ntt84nikm3h7dab9.jpg',
  },
  description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, odio!
          Debitis illum facilis deleniti dolore, consequatur, ex voluptates eos
          voluptas soluta sunt maiores accusamus. Dolorum nulla obcaecati quo
          officiis minus. Debitis, fugit! Dolor blanditiis in earum ut iusto
          nobis quia nulla molestiae ratione voluptates, tempore autem qui
          eligendi voluptatum est, sequi eius asperiores hic cumque suscipit
          numquam culpa. Totam recusandae inventore numquam deleniti ullam
          impedit error, facere sequi nam minima dolorum sunt unde ipsum sit id
          ipsa, sint earum doloremque cum exercitationem. Blanditiis ex`,
  id: 'ckz0imojc2ljz0c90xs8quu0b',
  imageUrl:
    'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643506502/Demo%20Uploads/o1g2frph9aa2qdsjmjmv.png',
  slug: 'asd-ll',
  title: 'asd ll',
  createdAt: '2022-01-30T00:19:15.046645+00:00',
}

type PostDetailProps = {
  data: { post: Post }
}

const PostDetail = ({ data }: PostDetailProps) => {
  const { post } = data

  const timeCreated = useMemo(() => {
    return timeago.format(post.createdAt)
  }, [post.createdAt])

  return (
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
  }
}

export default PostDetail
