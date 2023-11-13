import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true,
    minlength:3,
    length:50,
    lovercase: true,
    trim:true
  },
  name:{type: String, required: true, minlength:3, length:50},
  password:{type: String, required: true, minlength:4, length:100},
  languages:[],
  created_at:{type: Date, required: true, default:Date.now()}
})

export default new mongoose.model('users', usersSchema)