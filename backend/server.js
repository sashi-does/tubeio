import express from 'express'
import mongoDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js'
import cors from 'cors'
import userPreferencesRouter from './routes/userPreferencesRoute.js'

const app = express()
const port = 3000

mongoDB();

app.use(cors());
app.use(express.json());
app.use('/auth', userRouter);
app.use('/form-update', userPreferencesRouter);


app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is running at ${port}`)
})