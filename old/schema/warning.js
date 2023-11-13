import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique: true,
    lovercase: true,
    trim:true,
    minlength:[10,'Email must be more 2 charecters!'],
    maxlength:[100,'Email must be less 100 charecters!']
  },
  name: {
    type: String, 
    required: [true, 'Name required!'], 
    unique:true,
    trim:true,
    lovercase: true,
    minlength:[3,'Name must be more 2 charecters!'],
    maxlength:[100,'Name must be less 100 charecters!']
  },
  password: {
    type: String, 
    required: [true,'Password required!'],
    minlength:[4,'Password must be less 4 charecters!'],
    maxlength:[100,'Password must be less 100 charecters!']
  },
  created_at:{type: Date, required: true, default:Date.now()}
})

export default new mongoose.model('users', usersSchema)