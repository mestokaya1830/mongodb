const Router = require('express').Router()
const Users =  require('../modules/usersSchema.js')
const wrapAsync = require('../middleware/wrapasync.js')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('secret')
const formValidate = require('../middleware/formValidation')

Router.get('/register', wrapAsync(async(req, res) => {
  res.render('register',{title: 'Register'})
}))

Router.post('/register', wrapAsync(async(req, res) => {
  const errors = formValidate(req.body.name, req.body.password)
  if(errors.length > 0){
    req.flash('danger', errors[0].message)
    res.render('register', {name:req.body.name,password: req.body.password})
  }else{
    const checkUser = await Users.findOne({name: req.body.name})
    if(checkUser){
      req.flash('danger','This user is exists!')
      res.render('register', {name:req.body.name,password: req.body.password})
    }else{
      const newUser =  new Users({
        name: req.body.name, 
        password: cryptr.encrypt(req.body.password)
      })
      await newUser.save()
      req.flash('success','Saved Success!')
      res.redirect('/login')
    }
  }
}))

Router.get('/login', wrapAsync(async(req, res) => {
  res.render('login', {title: 'Login'})
}))

Router.post('/login', wrapAsync(async(req, res) => {
  const loginUser = await Users.find({name: req.body.name})
  if(loginUser.length > 0){
    let dePass = cryptr.decrypt(loginUser[0].password)
    if(req.body.password == dePass){
      req.session.auth = loginUser[0].name
      res.redirect('/admin/users')
    }else{
      req.flash('danger','Password not match')
      res.render('login', {name:req.body.name,password: req.body.password})
    }
  }else{
    req.flash('danger','User not found')
    res.redirect('/login')
  }
}))

//logout
Router.get('/logout',  wrapAsync(async(req, res) => {
  req.session.destroy((err) => {
    res.redirect('/')
  })
}))
module.exports = Router