const wrap = (param) => async(req, res, next) => {
  try {
    await param(req, res)
  } catch (error) {
    // res.json(error)
    return next(error)
  }
}

export default wrap