import mongoose from "mongoose";

const Schema = mongoose.Schema;
const users = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  user:{type: String, required: true, lovercase: true, trim:true},
  password:{type: String, required: true, trim:true},
})


export default new mongoose.model('users', users)
