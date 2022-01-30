import { GetStaticPaths, GetStaticProps } from 'next'
import { getPosts } from '../lib/graphcms'

import { Posts } from '../components/Posts'
import { Search } from '../components/Search'
import { Post } from '../types'

type HomeProps = {
  data: {
    posts: Post[]
  }
}

const Home = ({ data }: HomeProps) => {
  return (
    <main className="bg-neutral-900">
      <div className="container mx-auto flex flex-col pt-[88px]">
        <Search />
        <Posts posts={data} />
      </div>
    </main>
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
