import mongoose from "mongoose";

const usersSC = new mongoose.Schema({
  name: {
    type: String, 
    required:[true, 'Name is required'], 
    minlength:['3', 'Name must be more then 3'], 
    maxlength:['255','Name must be less then 255']
  },
  email: {
    type: String, 
    unique:[true, 'This email is exists'], 
    required:[true, 'Email is required'], 
    maxlength:['255','Email must be less then 255']
  },
  password: {
    type: String, 
    required:[true, 'Password is required'], 
    minlength:['3', 'Password must be more then 3'], 
    maxlength:['255','Password must be less then 255']
  },
  token: {type: String}
})

export default mongoose.model('users', usersSC)


not when unique not works
open mongosh use users then paste this db.users.ensureIndex( { "email": 1 }, { unique: true } )
