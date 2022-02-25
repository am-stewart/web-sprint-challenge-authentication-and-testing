const db = require('../../data/dbConfig')

function findBy(filter) {
  return db('users').where(filter)
}

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
  if(!req.body.username || !req.body.password) {
    res.status(422).json({ message: 'username and password required'})
  } else {
    next()
  }
}



module.exports = {
  checkUsernameTaken,
  validatePayload
}