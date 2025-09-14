const express = require('express')
const app = express()
const cors  = require('cors')
const path = require('path')
const mongoose = require('mongoose')

const port = 3000 || process.env.PORT
const host = '127.1.0.0' || process.env.HOST

app.set('port', port)

const db = new mongoose.connect('mongodb://localhost:27017/gasvet',{
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {console.log('Connected')})
.catch((err) => {console.error(err)})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'static')))

const usersSchema = new mongoose.Schema({} , {strict: false})
const Users = new mongoose.model('Users', usersSchema)

const getUsers = async() => {
  const result = await Users.aggregate([
    {$lookup: {
      from:'loginlogs',
      localField:'user',
      foreignField: 'user',
      as:'loginlogs'
    }}
  ])
  // console.log(JSON.stringify(result))//all list
  const tt = result.map(item => item.loginlogs)//get loginlogs
  console.log(tt)
}
getUsers()

app.use((error,req, res, next) => {
  console.log(error)
})

app.listen(port, host => {
  console.log('Server is running...')
})