app.post('/newuser', async(req, res) => {
  // var newusers = []
  // for (const key in req.body.newuser) {
  //   newusers.push({
  //     name:req.body.newuser[key].name,
  //     lastname:req.body.newuser[key].lastname,
  //     age:req.body.newuser[key].age
  //   })
  // }
  // let allusers = req.body.newuser.map(item => {
  //   return {
  //     name:item.name,
  //     lastname:item.lastname,
  //     age:item.age
  //   }
  // })
  try {
    await users.insertMany(req.body.newuser)
    res.json(res.statusCode)
  } catch (err) {
    console.log(err)
  }
})
