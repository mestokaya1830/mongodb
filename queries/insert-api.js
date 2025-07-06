import express from 'express'
const app = express()
import request from 'sync-request'
import cors from 'cors'
import db from '../db.js'
import mongoose  from 'mongoose'
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const photosSchema = new mongoose.Schema({} , {strict: false})
const Photos = new mongoose.model('Photos', photosSchema)

app.get('/', async(get, res) => {
  try {
    const result =  request('get','https://jsonplaceholder.typicode.com/photos',{json: {results: 'results'}})
    const final = JSON.parse(result.getBody('utf8'))
    await new Photos(final).save()
    res.send(result)
  } catch (error) {
    console.error(error)
  }
})

app.listen(3000, () => {
  console.log('Server is running...')
})