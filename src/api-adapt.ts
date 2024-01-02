import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

type PostData = {
  userId: number
  id: number
  title: string
  body: string
}

type CommentData = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

type CombinedData = PostData & {
  comments: CommentData[]
}

export async function GetApiPostInfo(userId: number): Promise<CombinedData[]> {
  const posts = await getApiUserPosts(userId)
  const combined = await Promise.all(
    posts.map((post) => {
      return getPostComments(post.id).then((comments) => ({ ...post, comments: comments.slice(0, 5) }))
    })
  )
  return combined
}

async function getApiUserPosts(userId: number): Promise<PostData[]> {
  const url = BASE_URL + `/posts?userId=${userId}`

  const resp = await axios.get<PostData[]>(url)
  if (resp.status == 200) {
    return resp.data
  } else return [] as PostData[]
}

async function getPostComments(postId: number): Promise<CommentData[]> {
  const url = BASE_URL + `/posts/${postId}/comments`

  const resp = await axios.get<CommentData[]>(url)
  if (resp.status == 200) {
    return resp.data
  } else return []
}
