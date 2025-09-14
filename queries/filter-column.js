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
  const result = await Users.find({name:"Deniz"}, {passowrd: 0})//expect password
  const result = await Users.find({name:"Deniz"}, {password: 1})//only password and id
  const result = await Users.find({name:"Deniz"}, {password: 1, _id: 0})//only password
  res.json(result)
})

app.listen(3000, () => {
  console.log('Server is running...')
})
