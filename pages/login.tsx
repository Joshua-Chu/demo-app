import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAuth } from '../lib/auth/AuthProvider'

const Login = () => {
  const router = useRouter()
  const { setRegUser } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const res = await fetch('/api/author/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((r) => r.json())

    setRegUser(res.user)
    setPassword('')
    setUsername('')

    router.push(`/profile/${res.user.username}`)
  }
  return (
    <>
      <Head>
        <title>Demo App - Login</title>
      </Head>
      <div className="mt-[88px]  py-8">
        <div className="container mx-auto  md:mx-auto md:max-w-lg">
          <h1 className="my-4 text-center text-blue-600">Login</h1>

          <form className="flex flex-col  gap-2  p-2 md:p-8" onSubmit={onLogin}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

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
    </>
  )
}

export default Login
