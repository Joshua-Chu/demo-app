import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Posts } from '../../components/Posts'
import { useAuth } from '../../lib/auth/AuthProvider'
import { getAuthor, getPostsOfUser } from '../../lib/graphcms'
import { Post, User } from '../../types'

// const data = {
//   posts: [
//     {
//       author: {
//         username: 'j',
//         imageUrl:
//           'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643461037/Demo%20Uploads/x7o6ntt84nikm3h7dab9.jpg',
//       },
//       description: 'asd',
//       id: 'ckz0imojc2ljz0c90xs8quu0b',
//       imageUrl:
//         'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643501953/Demo%20Uploads/aanye7ze0cvozqxrbhkn.png',
//       slug: 'asd-ll',
//       title: 'asd ll',
//       createdAt: '2022-01-30T00:19:15.046645+00:00',
//     },
//     {
//       author: {
//         username: 'j',
//         imageUrl:
//           'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643461037/Demo%20Uploads/x7o6ntt84nikm3h7dab9.jpg',
//       },
//       description: 'Post one',
//       id: 'ckz0o6xn42ugh0c90ac2nueni',
//       imageUrl:
//         'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643506502/Demo%20Uploads/o1g2frph9aa2qdsjmjmv.png',
//       slug: 'post-one',
//       title: 'Post One',
//       createdAt: '2022-01-30T02:54:58.280268+00:00',
//     },
//     {
//       author: {
//         username: 'j',
//         imageUrl:
//           'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643461037/Demo%20Uploads/x7o6ntt84nikm3h7dab9.jpg',
//       },
//       description:
//         'asdasindaisbdashibdasubdasudbasudbasudbasuhbdashdbasjhdbajshbdahjbdahjbdahjsbdahjbdhjabsdhjasbdhjasbdhjabsdhjabshdjabshjdbashjdbahjsdbahjsbdahjsbhjbdhjasbdhjabshjdbashjdbashjbdahjsbdhjasbdhjasbdhajsbdhjasbdhjabsd asjbdahjsbda  abjsdahjsbd hasbd ajsbdhajsbdhj',
//       id: 'ckz0o7n3s2u6x0c8161771bvn',
//       imageUrl:
//         'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643506502/Demo%20Uploads/o1g2frph9aa2qdsjmjmv.png',
//       slug: 'post-two',
//       title: 'Post two',
//       createdAt: '2022-01-30T02:55:31.518214+00:00',
//     },
//     {
//       author: {
//         username: 'j',
//         imageUrl:
//           'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643461037/Demo%20Uploads/x7o6ntt84nikm3h7dab9.jpg',
//       },
//       description:
//         "I am joshua chu and I'm trying to make something work when I should have done this 3 days ago I am joshua chu and I'm trying to make something work when I should have done this 3 days agoI am joshua chu and I'm trying to make something work when I should have done this 3 days ago",
//       id: 'ckz0oncow2vpr0d40v0ngzknx',
//       imageUrl:
//         'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643506502/Demo%20Uploads/o1g2frph9aa2qdsjmjmv.png',
//       slug: 'another-one',
//       title: 'Another One',
//       createdAt: '2022-01-30T03:07:44.136533+00:00',
//     },
//   ],
// }

const authorData = {
  author: {
    id: 'ckyzwm8rc1sew0c90k76zttfh',
    imageUrl:
      'https://res.cloudinary.com/dlfecpmkj/image/upload/v1643461037/Demo%20Uploads/x7o6ntt84nikm3h7dab9.jpg',
    username: 'j',
  },
}

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
