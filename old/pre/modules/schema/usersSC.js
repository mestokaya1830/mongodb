import mongoose from 'mongoose'
const Schema = mongoose.Schema

import addressSC from './addressSC.js'

const usersSC = new Schema({
  name:{type:String,required:true},
  lastname:{type:String,required:true},
  age:{type:Number,required:true},
  createAt: {type:Date, default: Date.now()}
})

usersSC.pre('deleteOne', { query: true }, async function(next) {
  await addressSC.deleteMany({user: this.getQuery().user})
  next()
})

export default mongoose.model('users', usersSC)
