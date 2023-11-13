const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSC = new Schema({
  name:{type:String,required:true},
  lastname:{type:String,required:true},
  age:{type:Number,required:true}
})

module.exports = mongoose.model('users', usersSC)