import Image from 'next/image'
import { useRouter } from 'next/router'
import { Post } from '../../types'

type CardProps = {
  post: Post
}

export const Card = ({ post }: CardProps) => {
  const router = useRouter()
  const truncatedDescription = post.description.slice(0, 40) + '...'

  console.log(truncatedDescription)
  return (
    <div className="flex justify-center ">
      <div className="h-fit w-full max-w-[350px]  shadow-lg">
        <div className="relative  h-72 w-full">
          <Image src={post.imageUrl} layout="fill" className="rounded-t-xl" />
        </div>

        <div className="flex min-h-[150px] flex-col gap-2 rounded-b-xl bg-blue-50 p-6 text-gray-600">
          <h3 className="text-xl font-bold text-blue-600">{post.title}</h3>
          <p className="font-bold">Created by: @{post.author.username}</p>
          <p className="break-words">
            {post.description.length >= 80
              ? truncatedDescription
              : post.description}
          </p>
          <button
            className="self-end rounded-lg bg-blue-600"
            onClick={() => router.push(`/post/${post.slug}`)}
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  )
}
