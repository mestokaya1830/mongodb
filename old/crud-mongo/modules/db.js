const mongoose = require('mongoose')

const db = mongoose.connect('mongodb://crud:9090@localhost:27017/crud?authSource=crud',{
  useNewUrlParser:true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected')
}).catch((err) => {console.log(err)})

module.exports = db