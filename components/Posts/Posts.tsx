import Image from 'next/image'

export const Posts = ({ posts }) => {
  return (
    <>
      <div className="container mx-auto flex flex-col pt-[148px]">
        <div>Search</div>
        <div className="grid-col-1 mx-auto  grid max-w-7xl gap-8  md:grid-cols-2 xl:grid-cols-3">
          {posts.posts.map((post) => (
            <div key={post.id} className="flex justify-center ">
              <div className="h-fit w-full max-w-[350px] shadow-lg">
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
                  <p className="font-bold">
                    Created by: @{post.author.username}
                  </p>
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
    </>
  )
}
