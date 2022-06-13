const pool = require('../config/db')

const getTransactionById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT transaction.id, users.name AS user_name, products.name AS product_name,transaction.status FROM ((transaction
        INNER JOIN products ON transaction.id_products = products.id)
        INNER JOIN users ON transaction.id_user = users.id)
        WHERE transaction.id = $1`, [id],
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

const getAllTransaction = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query(
        `SELECT transaction.id, users.name AS user_name, products.name AS product_name,transaction.status 
          FROM ((transaction
          INNER JOIN products ON transaction.id_products = products.id)
          INNER JOIN users ON transaction.id_user = users.id)
          LIMIT $1 OFFSET $2`,
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

const insertTransaction = ({ idProduct, idUser }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO transaction(id_product, id_user)VALUES($1, $2)',
      [idProduct, idUser],
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

const updateTransaction = (idProduct, idUser, status, id) => {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE transaction SET(id_product, id_user, status)VALUE($1, $2, $3) WHERE id = $4',
      [idProduct, idUser, status, id],
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
  })
}

const deleteTransaction = (id) => {
  return pool.query('DELETE FROM transaction WHERE id = $1', [id])
}

const countTransaction = () => {
  return pool.query('SELECT COUNT(*) AS total FROM transaction')
}
module.exports = {
  getTransactionById,
  getAllTransaction,
  insertTransaction,
  updateTransaction,
  countTransaction,
  deleteTransaction
}
