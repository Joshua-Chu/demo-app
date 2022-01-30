import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuth } from '../lib/auth/AuthProvider'

const Create = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [postImage, setPostImage] = useState<string | ArrayBuffer | null>('')

  const postImageUploader = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as HTMLInputElement
    const reader = new FileReader()

    reader.onload = function (onLoadEvent) {
      setPostImage(onLoadEvent.target && onLoadEvent.target.result)
    }

    reader.readAsDataURL((target.files && target.files[0]) as Blob)
  }

  const onPostSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const form = e.currentTarget as any
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

    const res = await fetch('/api/posts/create', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        imageUrl: data.secure_url,
        username: user.username,
        slug: `${user.username}-${title.toLowerCase().replaceAll(' ', '-')}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setTitle('')
    setDescription('')
    setPostImage('')

    router.push(`/profile/${user.username}`)
  }
  return (
    <div className="mt-[88px] py-8">
      <div className="container mx-auto  md:mx-auto md:max-w-lg">
        <h1 className="my-4 text-center text-blue-600">Create Post</h1>

        <form
          className="flex flex-col  gap-2  p-2 md:p-8"
          onSubmit={onPostSubmit}
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <img src={postImage as string} />
          <label htmlFor="file">File</label>
          <input type="file" id="file" onChange={postImageUploader} />

          <button className="mt-8 bg-blue-600" type="submit">
            Create Post
          </button>
        </form>
      </div>
    </div>
  )
}

export default Create
