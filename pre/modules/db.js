import mongoose from 'mongoose'

const db = mongoose.connect('mongodb://localhost:27017/works?authSource=works')
.then(() => console.log('Connected'))
.catch((err) => console.log(err))

export default db