import express from 'express'
const app = express()
import db from '../db'
import Users from '../usersSchema'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async(req, res) => {
  const result = await Users.find({name:"Fatih"}, "messages")
  res.json(result)
})

app.listen(3000, () => {
  console.log('Server is running...')
})