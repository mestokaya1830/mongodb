const isAuth = (req, res, next) => {
  if(req.session.auth){
    next()
  }else{
    req.flash('errors', 'Please login!')
    res.redirect('/login')
  }
}

module.exports = isAuth