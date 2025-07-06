import express from 'express'
const app = express()
import cors from 'cors'
import db from './modules/db.js'
import Wrap from './modules/tryWrap.js'
import Users from './modules/schema/usersSC.js'
import Address from './modules/schema/addressSC.js'
import 'dotenv/config'
import path from  'path'

app.use(cors())
app.use(express.json())

app.get('/api', Wrap(async(req, res) => {
  const result = await Users.find().lean()
  console.log(result)
  res.json(result)
}))

app.post('/api/newuser', async(req, res) => {
  const newUser = new Users({
    name:req.body.newuser.name,
    lastname:req.body.newuser.lastname,
    age:req.body.newuser.age
  })
  await newUser.save()

  const last = await Users.findOne().sort({createAt: -1})
  console.log(last)
  const newAddress = new Address({
    userID:last._id,
    country:'Turkey',
    city:'Antep'
  })
  await newAddress.save()
  res.json('200')
})

app.delete('/api/remove-user/:id', async(req, res) => {
  await Users.deleteOne({_id: req.params.id})
  res.json('200')
})

if(process.env.NODE_ENV == 'production'){
  app.use(express.static('dist'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('./dist/index.html'))
  })
}

app.use((err, req, res, next) => {
  console.log(err)
  next()
})
app.listen(3000, () => {
  console.log('Server is running...')
})