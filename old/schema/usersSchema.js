import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
  name:{type: String, required: true, unique:true, minlength:3, length:50},
  password:{type: String, required: true, minlength:4, length:100},
  age:{type: Number, required: true, min:18, max:100},
  salary:{type: Number, required: true, minlength:1000, maxlength:50000},
  language:{type: Array, required: true},
  messages:{type: Object, required: true},
  children:{type: Array, required: true},
  created_at:{type: Date, required: true, default:Date.now()},
  isAdmin:{type: Boolean, default: false}
})

export default new mongoose.model('users', usersSchema)