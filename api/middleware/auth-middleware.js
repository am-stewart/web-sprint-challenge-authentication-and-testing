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
      next();
    }
  } catch (err) {
    next(err)
  }
}



module.exports = {
  checkUsernameTaken
}