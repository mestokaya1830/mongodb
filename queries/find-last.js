import express from 'express'
const app = express()
import 'dotenv/config'
import db from './db.js'
import Users from './schema/usersSchema.js'

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async(req, res) => {
  const result = await Users.findOne().sort({created_at: -1})
  let {  name } = result
  console.log(name)
  res.json(result)
})

app.listen(process.env.PORT, () => {
  console.log('Server is running...')
})