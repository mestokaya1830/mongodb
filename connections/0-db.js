import mongoose from "mongoose";

//PROMISE
const db = mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected with Promise'))
.catch((err) => console.log(err))
export default  db

//ASYNC
// const db = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URL);
//     console.log(conn.connection.host);
// 		console.log('Connected with Async')
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// export default db;
