export interface Post {
  author: {
    id: string
    imageUrl: string
    username: string
  }
  description: string
  id: string
  imageUrl: string
  slug: string
  title: string
  createdAt: string
}

export type User = {
  id: ''
  username: ''
  imageUrl: ''
}
