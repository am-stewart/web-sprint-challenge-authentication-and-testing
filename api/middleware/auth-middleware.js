const { findBy } = require('../model')

const checkUsernameTaken = async (req, res, next) => {
  try {
    const existingUsers = await findBy({ username: req.body.username })
    if(existingUsers.length) {
      next({
        status: 422,
        message: 'username taken'
      })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

const validatePayload = (req, res, next) => {
  const username = req.body.username.trim()
  const password = req.body.password.trim()

  if(!username || !password) {
    res.status(422).json({ message: 'username and password required'})
  } else {
    next()
  }
}



module.exports = {
  checkUsernameTaken,
  validatePayload,
}