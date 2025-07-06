const express = require('express')
const Users = require('./schema/usersSC')
const Address = require('./schema/addressSC')
const app = express()
const db = require('./db')


app.get('/', async(req, res) => {
  const result = await Users.find({})
  res.json(result)
})
app.post('/newuser', async(req, res) => {
  const newUser = new Users({
    name:req.body.newuser.name,
    lastname:req.body.newuser.lastname,
    age:req.body.newuser.age
  })
  await newUser.save()

  const last = await Users.findOne().sort({createAt: -1})
  const newAddress = new Address({
    userID:last._id,
    country:'Turkey',
    city:'Antep'
  })
  await newAddress.save()
  res.json('Saved')
})
app.delete('/remove-user', async(req, res) => {
  // await Users.deleteOne({_id: req.body.userid})
  res.json('200')
})

export default {
  path:'/api',
  handler: app
}