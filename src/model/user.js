const pool = require('../config/db')
const findEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const insert = ({ id, email, password, name }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO users(id, email, password, name)VALUES($1, $2, $3, $4)', [id, email, password, name], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const deleteUser = async (req, res, next) => {

}

module.exports = {
  findEmail,
  insert,
  deleteUser
}
