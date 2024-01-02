import { Request, Response } from 'express'
import { GetApiPostInfo } from './api-adapt'

export async function GetUserPosts(req: Request, res: Response) {
  const userIdString = req.params.id
  const userId = parseInt(userIdString)

  if (Number.isNaN(userId)) {
    // handling malformed input
    return res.status(400).json({ message: 'malformed user id' })
  }

  const posts = await GetApiPostInfo(userId)
  if (posts && posts.length !== 0) {
    return res.json(posts)
  } else return res.status(404).json({ message: `no posts available for user ${userId}` })
}
