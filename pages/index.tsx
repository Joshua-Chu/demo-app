import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import { getAuthors, getPosts } from '../lib/graphcms'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

const Home = () => {
  //   console.log('authors', authors.authors)
  //   console.log('authors', authors)

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
      body: JSON.stringify({ username, password, imageUrl: data.secure_url }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // console.log(await res.json())
    setUsername('')
    setPassword('')
    setImageSrc('')
  }

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [postImage, setPostImage] = useState('')

  const postImageUploader = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const reader = new FileReader()

    reader.onload = function (onLoadEvent) {
      setPostImage(onLoadEvent.target.result)
    }

    reader.readAsDataURL(e.target.files[0])
  }

  const onPostSubmit = async (e: React.SyntheticEvent) => {
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

    const res = await fetch('/api/posts/create', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        imageUrl: data.secure_url,
        username: 'j',
        slug: title.toLowerCase().replaceAll(' ', '-'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log(res)

    // setTitle('')
    // setDescription('')
    // setPostImage('')
  }

  return (
    <>
      <div>
        {/* <h1 className="text-lg font-bold text-red-500">Author</h1>

        <form className="flex w-2/5 flex-col gap-8" onSubmit={onSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="border border-red-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            className="border border-red-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img src={imageSrc} />
          <label htmlFor="file">File</label>
          <input
            type="file"
            id="file"
            className="border border-red-500"
            //   value={imageSrc}
            onChange={imageUploadHandler}
          />

          <button
            className="rounded-3xl bg-red-500 py-4 px-8 text-white"
            type="submit"
          >
            Register
          </button>
        </form> */}

        {/* <div>
        <h2>Posts:</h2>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <p>Title: {post.title}</p>
                <MDXRemote {...post.source} />
                <pre>{JSON.stringify(post.source, null, 2)}</pre>
                <img src={post.imageUrl} alt="" />
              </li>
            )
          })}
        </ul>
      </div> */}
      </div>

      <form className="flex w-2/5 flex-col gap-8" onSubmit={onPostSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-red-500"
        />

        <label htmlFor="description">Description</label>
        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-red-500"
        />

        <img src={postImage} />
        <label htmlFor="file">File</label>
        <input
          type="file"
          id="file"
          className="border border-red-500"
          onChange={postImageUploader}
        />

        <button
          className="rounded-3xl bg-red-500 py-4 px-8 text-white"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   //   const authors = await getAuthors()
//   //   const posts = await getPosts()
//   //   const newPosts = await Promise.all(
//   //     posts.posts.map(async (post) => {
//   //       return {
//   //         ...post,
//   //         source: await serialize(post.description.markdown),
//   //       }
//   //     })
//   //   )

//   //   console.log(newPosts)
//   return {
//     props: {
//       authors: 'authors',
//       posts: '',
//     },
//     revalidate: 3,
//   }
// }

export default Home
