const express = require('express')
const app = express()
const cors = require('cors')
const db = require('../db')
const Users = require('../usersSchema.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async(req, res) => {
  const result = await Users.findOne().sort({created_at: -1})
  res.json(result)
})

app.listen(3000, () => {
  console.log('Server is running...')
})