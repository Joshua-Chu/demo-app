import { GetStaticProps } from 'next'
import { getPosts } from '../lib/graphcms'
import { Posts } from '../components/Posts'
import { Search } from '../components/Search'
import { Post } from '../types'
import { useCallback, useState } from 'react'
import Head from 'next/head'

type HomeProps = {
  data: {
    posts: Post[]
  }
}

const Home = ({ data }: HomeProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = useCallback(
    (searchTerm) => {
      if (searchTerm === '') return data

      const newData = data.posts.filter((post) => {
        return (
          post.title.includes(searchTerm) ||
          post.description.includes(searchTerm)
        )
      })

      return { posts: newData }
    },
    [searchTerm]
  )

  return (
    <>
      <Head>
        <title>Demo App - Home</title>
      </Head>
      <main className="min-h-screen bg-neutral-900">
        <div className="container mx-auto flex flex-col pt-[88px]">
          <Search searchTerm={searchTerm} onChangeSearchTerm={setSearchTerm} />
          <Posts posts={filteredPosts(searchTerm)} />
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getPosts()

  return {
    props: {
      data,
    },
  }
}

export default Home
