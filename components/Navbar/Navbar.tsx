import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../lib/auth/AuthProvider'

export const Navbar = () => {
  const router = useRouter()
  const { user, logout } = useAuth()

  return (
    <header className="fixed top-0 z-10 max-h-[88px] w-screen bg-gray-200 shadow-md">
      <nav className="container mx-auto flex justify-between px-4 py-8">
        <Link href={'/'}>
          <a className="text-2xl font-bold text-blue-600">Home</a>
        </Link>
        <div className="flex w-72 justify-end gap-4 ">
          {user.username && (
            <>
              <Link href={'/create'}>
                <a className="link-btn">Create</a>
              </Link>
              <Link href={`/profile/${user.username}`}>
                <a className="link-btn">My Profile</a>
              </Link>
              <a
                type="button"
                onClick={() => {
                  logout()
                  router.push('/login')
                }}
                className="link-btn"
              >
                Sign Out
              </a>
            </>
          )}

          {!user.username && (
            <>
              <Link href={'/login'}>
                <a className="link-btn">Login</a>
              </Link>
              <Link href={'/register'}>
                <a className="link-btn">Register</a>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
