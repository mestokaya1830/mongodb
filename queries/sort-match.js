const express = require('express')
const app = express()
const cors  = require('cors')
const path = require('path')
const mongoose = require('mongoose')

const port = 3000 || process.env.PORT
const host = '127.1.0.0' || process.env.HOST

app.set('port', port)

const db = new mongoose.connect('mongodb://localhost:27017/works',{
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

const personsSchema = new mongoose.Schema({} , {strict: false})
const Persons = new mongoose.model('Persons', personsSchema)

const getPersons = async() => {
  const result = await Persons.aggregate([
    {$match: {age: {$gt:30} } },
    {$sort: {age: 1 } }
  ])
  console.log(result)
}
getPersons()

app.use((error,req, res, next) => {
  console.log(error)
})

app.listen(port, host => {
  console.log('Server is running...')
})