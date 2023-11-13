const express = require('express')
const app = express()
const cors = require('cors')
const db = require('../db')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const usersSchema = new mongoose.Schema({},{strict: false})
const Users = mongoose.model('users', usersSchema)

app.get('/', async(req, res) => {
  const result = await Users.find({name:"Deniz"}, "language")
  res.json(result)
})

app.listen(3000, () => {
  console.log('Server is running...')
})