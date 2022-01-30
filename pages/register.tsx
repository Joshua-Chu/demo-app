import { useRouter } from 'next/router'
import { useState } from 'react'

const Register = () => {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [imageSrc, setImageSrc] = useState('')

  const imageUploadHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result)
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const form = e.currentTarget
    const fileInput = form.elements.file
    const formData = new FormData()

    for (const file of fileInput.files) {
      formData.append('file', file)
    }

    formData.append('upload_preset', 'demo-uploads')

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dlfecpmkj/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    ).then((r) => r.json())

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
    })

    if (res.status === 200) {
      setUsername('')
      setPassword('')
      setImageSrc('')

      router.push('/')
      //   TODO: store user in user context
    }
  }

  return (
    <div className="mt-20  py-8">
      {' '}
      <div className="mt-20  py-8">
        <div className="container mx-auto  md:mx-auto md:max-w-lg">
          <h1 className="my-4 text-center text-blue-600">Register</h1>

          <form
            className="flex flex-col  gap-2  p-2 md:p-8"
            onSubmit={onSubmit}
          >
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
              py-4
              px-8
            />
            <img src={imageSrc} />
            <label htmlFor="file">File</label>
            <input
              type="file"
              id="file"
              //   value={imageSrc}
              onChange={imageUploadHandler}
            />

            <button className="mt-8 bg-blue-600" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
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
            py-4
            px-8
          />
          <img src={imageSrc} />
          <label htmlFor="file">File</label>
          <input
            type="file"
            id="file"
            //   value={imageSrc}
            onChange={imageUploadHandler}
          />

          <button className="mt-8 bg-blue-600" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
