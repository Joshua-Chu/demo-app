import { Post } from '../../types'
import { Card } from '../Card'

type PostsProps = {
  posts: {
    posts: Post[]
  }
}

export const Posts = ({ posts }: PostsProps) => {
  return (
    <>
      {/* <div className="container mx-auto flex flex-col pt-[148px]"> */}
      <div className="grid-col-1 mx-auto  grid max-w-5xl gap-8  md:grid-cols-2 xl:grid-cols-3 ">
        {posts.posts.map((post) => (
          <Card post={post} key={post.id} />
        ))}
      </div>
      {/* </div> */}
    </>
  )
}
