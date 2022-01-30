import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuth } from '../lib/auth/AuthProvider'

const Register = () => {
  const { setRegUser } = useAuth()
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>('')

  const imageUploadHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const target = e.target as HTMLInputElement
    const reader = new FileReader()

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target && onLoadEvent.target.result)
    }

    reader.readAsDataURL((target.files && target.files[0]) as Blob)
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const form = e.currentTarget as any
    const fileInput = form.elements.file
    const formData = new FormData()

    for (const file of fileInput.files) {
      formData.append('file', file)
    }

    formData.append('upload_preset', 'demo-uploads')

    // Store images to Cloudinary
    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dlfecpmkj/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    ).then((r) => r.json())

    // Register Author in CMS
    const res = await fetch('/api/author/create', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        imageUrl: data.secure_url,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((r) => r.json())

    setUsername('')
    setPassword('')
    setImageSrc('')

    setRegUser(res.user.createAuthor)
    router.push('/')
  }

  return (
    <div className="mt-[88px] py-8">
      <div className="container mx-auto  md:mx-auto md:max-w-lg">
        <h1 className="my-4 text-center text-blue-600">Register</h1>

        <form className="flex flex-col  gap-2  p-2 md:p-8" onSubmit={onSubmit}>
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
          <img src={imageSrc as string} />
          <label htmlFor="file">File</label>
          <input type="file" id="file" onChange={imageUploadHandler} />

          <button className="mt-8 bg-blue-600" type="submit">
            Register
          </button>
        </form>
        <p className="text-center text-lg text-gray-700">
          Already have an account?{' '}
          <Link href={'/login'}>
            <a className="text-blue-600">Login here!</a>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
