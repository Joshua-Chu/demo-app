import Link from 'next/link'

const Login = () => {
  return (
    <div className="mt-12  py-8">
      <div className="container mx-auto  md:mx-auto md:max-w-lg">
        <h1 className="my-4 text-center text-blue-600">Register</h1>

        <form className="flex flex-col  gap-2  p-2 md:p-8">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />

          <label htmlFor="password">Password</label>
          <input type="text" id="password" py-4 px-8 />

          <button className="mt-8 bg-blue-600" type="submit">
            Login
          </button>
        </form>
        <p className="text-center text-lg text-gray-700">
          Don't have an account yet?
          <Link href={'/register'}>
            <a className="text-blue-600">Register here!</a>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
