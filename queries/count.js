import express from 'express'
const app = express()
import cors from 'cors'
import db from '../db.js'
import Users from './usersSchema.js'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async(req, res) => {
  const result = await Users.countDocuments({})
  res.json(result)
})

app.listen(3000, () => {
  console.log('Server is running...')
})
