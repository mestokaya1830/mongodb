import express from 'express'
const app = express()
import db from '../db'
import Users from '../usersSchema.js'

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async(req, res) => {
  const newUser = new Users({
    name:"Fatih",
    password:"1234",
    salery:3000,
    language:['Python'],
    messages:[
      {userName:'Fatih',text:'Messages 1'},
      {userName:'Fatih',text:'Messages 2'},
      {userName:'Fatih',text:'Messages 3'}
    ]
  })
  await newUser.save()
  const result = await Users.find()
  res.json(result)
})

app.listen(3000, () => {
  console.log('Server is running...')
})