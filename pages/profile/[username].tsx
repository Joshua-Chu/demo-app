import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Posts } from '../../components/Posts'
import { useAuth } from '../../lib/auth/AuthProvider'
import { getAuthor, getPostsOfUser } from '../../lib/graphcms'
import { Post, User } from '../../types'

type ProfilePageProps = {
  data: { posts: Post[] }
}

const ProfilePage = ({ data }: ProfilePageProps) => {
  const router = useRouter()
  const { user } = useAuth()
  const [userData, setUserData] = useState<User>({
    id: '',
    username: '',
    imageUrl: '',
  })

  useEffect(() => {
    const fetchAuthor = async () => {
      return await getAuthor(router.query.username as string)
    }
    if (user.username === '' && user.username !== router.query.username) {
      fetchAuthor().then((data) => setUserData(data.author))
    }
  }, [user])

  return (
    <>
      <Head>
        <title>Demo app - {user.username || userData.username}</title>
      </Head>
      <main className="min-h-screen bg-neutral-900 pb-40">
        <div className="container mx-auto flex flex-col pt-[88px] ">
          {user.username === '' && user.username !== router.query.username && (
            <div className="mx-auto mt-12 mb-16 sm:mt-20">
              <div className="relative h-40 w-40 rounded-full">
                {userData.imageUrl && (
                  <Image
                    src={userData.imageUrl}
                    layout="fill"
                    className="rounded-full"
                  />
                )}
              </div>
              <h2 className="mt-4 text-center text-2xl font-bold text-blue-600">
                @{userData.username}
              </h2>
            </div>
          )}

          {user.username !== '' && user.username === router.query.username && (
            <div className="mx-auto mt-12 mb-16 sm:mt-20">
              <div className="relative h-40 w-40 rounded-full">
                {user.imageUrl && (
                  <Image
                    src={user.imageUrl}
                    layout="fill"
                    className="rounded-full"
                  />
                )}
              </div>
              <h2 className="mt-4 text-center text-2xl font-bold text-blue-600">
                @{user.username}
              </h2>
            </div>
          )}

          <div>
            {data.posts.length !== 0 ? (
              <Posts posts={data} />
            ) : (
              <p className="mx-auto  text-center text-2xl text-white">
                No posts yet?{''}
                <Link href={'/create'}>
                  <a className="font-bold text-blue-600"> Create here</a>
                </Link>
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { username } = params as { username: string }
  const data = await getPostsOfUser(username)
  return {
    props: {
      data,
    },
  }
}

export default ProfilePage
