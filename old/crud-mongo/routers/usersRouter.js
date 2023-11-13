const Router = require('express').Router()
const Users =  require('../modules/usersSchema.js')
const wrapAsync = require('../middleware/wrapasync.js')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('secret')
const nodemailer  = require('nodemailer')

Router.get('/users', wrapAsync(async(req, res) => {
  const allUsers = await Users.find({})
  res.render('users', {
    title: 'Users',
    users: allUsers
  })
}))

Router.get('/detailuser/:id', wrapAsync(async(req, res) => {
  const user = await Users.findById(req.params.id)
  result = {
    name: user.name,
    password:cryptr.decrypt(user.password)
  }
  res.render('detailuser', {
    title: 'Details',
    user: result
  })
}))

Router.get('/edituser/:id', wrapAsync(async(req, res) => {
  const user = await Users.findById(req.params.id)
  result = {
    id: user._id,
    name: user.name,
    password:cryptr.decrypt(user.password)
  }
  res.render('edituser', {
    title: 'Details',
    user: result
  })
}))

Router.post('/edituser/:id', wrapAsync(async(req, res) => {
  if(req.body.password.length > 3){
    await Users.updateOne(
      {_id:req.params.id},
      { $set: { password: cryptr.encrypt(req.body.password) } }
    )
    req.flash('success','Edit Success!')
    res.redirect('/admin/edituser/'+ req.params.id)
  }else{
    req.flash('danger','Some Error!')
    res.redirect('/admin/edituser/'+ req.params.id)
  }
}))

Router.get('/deleteuser/:id', wrapAsync(async(req, res) => {
  await Users.deleteOne({_id: req.params.id})
  res.redirect('/admin/users')
}))

Router.get('/contact', wrapAsync(async(req, res) => {
  res.render('contact')
}))

Router.post('/contact', wrapAsync(async(req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
      user:'mesto1830@outlook.com',
      pass: 'MK1972mk'
    }
  })
  
  const mailoption  = {
    from: 'mesto1830@outlook.com',
    to: req.body.emailTo,
    subject: req.body.subject,
    text: req.body.email,
    html: '<h3>Hi</h3>',
  }
  await transporter.sendMail(mailoption)
  res.redirect('/admin/contact')
  
}))
Router.post('/users/search', wrapAsync(async(req, res) => {
  if(req.body.name === ''){
    const allUsers = await Users.find()
    res.render('users', {
      title: 'Users',
      users: allUsers
    })
  } else {
    const allUsers = await Users.find({name:req.body.name})
    res.render('users', {
      title: 'Users',
      users: allUsers
    })
  }
}))
module.exports = Router