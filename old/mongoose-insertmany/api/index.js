const express = require('express')
const mongoose = require('mongoose')
const users = require('./schema/usersSC')
const app = express()

//mongo
mongoose.connect('mongodb://localhost/gasvet',{
  useNewUrlParser:true,
  useUnifiedTopology: true
})
.then(()=>{console.log('Connected')})
.catch((err)=>{console.log(err)})

app.get('/', async(req, res) => {
  const result = await users.find({})
  res.json(result)
})
app.post('/newuser', async(req, res) => {
  // var newusers = []
  // for (const key in req.body.newuser) {
  //   newusers.push({
  //     name:req.body.newuser[key].name,
  //     lastname:req.body.newuser[key].lastname,
  //     age:req.body.newuser[key].age
  //   })
  // }
  // let allusers = req.body.newuser.map(item => {
  //   return {
  //     name:item.name,
  //     lastname:item.lastname,
  //     age:item.age
  //   }
  // })
  try {
    await users.insertMany(req.body.newuser)
    res.json(res.statusCode)
  } catch (err) {
    console.log(err)
  }
})

export default {
  path:'/api',
  handler: app
}