const express = require('express')
const app = express()
const db = require('./modules/db')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const cors = require('cors')
const helmet = require('helmet')
const dotenv = require('dotenv')
dotenv.config()
const isAuth = require('./middleware/isAuth')

const homeRouter = require('./routers/homeRouter.js')
const authRouter = require('./routers/authRouter.js')
const usersRouter = require('./routers/usersRouter.js')

app.use(cors());
//app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('static'))



// app.set('views', path.join(__dirname, 'templates'))//custom folder
app.set('view engine','pug')//default


//first install connect-flash and express-messages
app.use(require('connect-flash')())
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.locals.moment = require('moment')


app.use(session({
  secret: 'admin',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  httpOnly: true,//only transmit cookie over https
  secure: true,//prevents client side js reading the cookies
  store: new MemoryStore({
    checkPeriod: 86400000
  })
}))

app.use('/', homeRouter)
app.use('/', authRouter)
app.use('/admin', isAuth, usersRouter)

app.use((error, req, res, next) => {
  res.render('error', {error})
})


//listen server
app.listen(4000, () => {
  console.log('Server listen...')
})
