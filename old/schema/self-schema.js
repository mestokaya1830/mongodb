const mongoose =  require('mongoose')
const morgan = require('morgan')

const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.mongoURL,{
  useNewUrlParser: true
})
.then(() => console.log('Connected'))
.catch((err) => console.error(err))


app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

//self schema
const usersSchema = new mongoose.Schema({} , {strict: false})
const Users = new mongoose.model('Users', usersSchema)

app.get('/', async (req, res) => {
  const result = await Users.find()
  console.log(result)
  res.json({message:'Welcome'})
})

app.use((error, req, res, next) => {
  console.log(error)
})

app.listen(process.env.PORT || 4000, () => {
  console.log('Sever is running...')
})
