import mongoose from 'mongoose'
const db = mongoose.connect('mongodb://127.0.0.1:27017/works',{
  useNewUrlParser: true
})
.then(() => console.log('Connected'))
.catch((err) => console.error(err))

//or async
// const db = async () => {
//   try{
//     const conn = await mongoose.connect('mongodb://localhost:27017/works',{
//       useFindAndModify: true
//     })
//   }catch(err){
//     console.log(err)
//     process.exit(1)
//   }
// }

export default db
