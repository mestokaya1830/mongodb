import express from 'express'
const app = express()
import  cors from 'cors'
import  db from '../db.js'
import  Users from '../schema/usersSchema.js'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async(req, res) => {
  //await Users.updateOne({name:"Deniz"},{salery:5000})

  //multiple conditions
  // await Users.updateOne({$or:[{name:'Mesto'},{salary:4000}]},{ $set:{salary:4000} })
  // await Users.updateOne({$and:[{name:'Mesto'},{salary:4000}]},{ $set:{salary:6000} })
  const result = await Users.find()
  res.json(result)
})

app.listen(3000, () => {
  console.log('Server is running...')
})