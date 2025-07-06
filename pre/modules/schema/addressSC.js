import mongoose from 'mongoose'
const Schema = mongoose.Schema

const addressSC = new Schema({
  userID:{type:Object,required:true},
  country:{type:String,required:true},
  city:{type:String,required:true}
})

export default mongoose.model('address', addressSC)