import express from 'express'
const app = express()
import cors from 'cors'
import db from '../db.js'
import Users from '../schema/usersSchema.js'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async(req, res) => {
  const newUser = new Users({
    name:"Mesto",
    password:"1234",
    age:30,
    salary:5000,
    language:['Python','Javascript'],
    messages:[{userName:"Ali",text:'Hello'}],
    children:[
      {name:'Ali',age:12,gender:"male"},
      {name:'Banu',age:2,gender:'female'}
    ]
  })
  await newUser.save()
  const result = await Users.find()
  res.json(result)
})

app.listen(3000, () => {
  console.log('Server is running...')
})