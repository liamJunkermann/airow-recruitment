import dotenv from 'dotenv'
import express, { Express } from 'express'
import { GetUserPosts } from './routes'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.get('/posts/:id', GetUserPosts)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
