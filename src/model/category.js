const pool = require('../config/db')
const select = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM category LIMIT $1 OFFSET $2',
      [limit, offset],
      (err, result) => {
        if (!err) {
          resolve(result.rows)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}
const insert = ({ name }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO category(name)VALUES($1)',
      [name],
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}

const updateCategory = (name, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE category SET name = $1 WHERE id = $2',
      [name, id],
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
  })
}

const deleteCategory = (id) => {
  return pool.query('DELETE FROM category WHERE id = $1', [id])
}

const countCategory = () => {
  return pool.query('SELECT COUNT(*) AS total FROM category')
}

const getCategoryById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM category WHERE id = $1 ', [id],
      (err, result) => {
        if (!err) {
          resolve(result.rows)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}

module.exports = {
  select,
  insert,
  deleteCategory,
  countCategory,
  getCategoryById,
  updateCategory
}
