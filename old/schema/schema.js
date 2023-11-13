const mongoose = require('mongoose')

//if you need validation for array object please create a schema for nested
//messages otherwise create simple messages:[] without schema

const messagesSchema = new mongoose.Schema({
  userName:{type: String, required: true},
  text:{type: String, required: true}
})

const TestSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Name required!'], unique:true},
  password: {type: String, required: [true,'Password required!'],minlength:[4,'Password must be less 4 charecters!']},
  salery: {type: Number, required: [true,'Salery required!'],minlength:[4,'Salery must be less 4 charecters!']},
  language: [{type:String, reuired: true}],
  messages:[messagesSchema],
  messagesCount: {type: Number},
  scores:[Number],
  children:[Array],
  created_at: {type: Date, default: Date.now()}
})

module.exports = new mongoose.model('Test', TestSchema)