const express = require('express')
const app = express()
const cors = require('cors')
const db = require('../db')
const mongoose = require('mongoose')
const Users = require('../usersSchema')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async(req, res) => {
  const result = await Users.find({}, "language")
  res.json(result)
})

app.listen(3000, () => {
  console.log('Server is running...')
})