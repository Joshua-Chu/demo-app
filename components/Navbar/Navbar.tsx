import Link from 'next/link'

export const Navbar = () => {
  return (
    <header className="fixed top-0 z-10 max-h-[88px] w-screen bg-gray-200 shadow-md">
      <nav className="container mx-auto flex justify-between px-4 py-8">
        <Link href={'/'}>Home</Link>
        <div className="flex w-72 justify-between bg-green-500">
          <Link href={'/create'}>Create </Link>
          <Link href={'/login'}>Login</Link>
          <Link href={'/register'}>Register</Link>
        </div>
      </nav>
    </header>
  )
}
