import express from 'express'
import neonDB from './config/neondb.js'
import mongoDB from './config/mongodb.js'
const app = express()
const port = 3000

mongoDB();

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is running at ${port}`)
})