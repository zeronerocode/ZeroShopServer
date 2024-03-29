const pool = require('../config/db')

const getTransactionById = (id) => {
  return new Promise((resolve, reject) => {
    console.log(id);
    pool.query(
      `SELECT transaction.id, users.name AS user_name, products.name AS product_name,transaction.status FROM ((transaction
        INNER JOIN products ON transaction.id_product = products.id)
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

const getAllTransaction = () => {
  return new Promise((resolve, reject) => {
    pool.query(
        `SELECT transaction.id, users.name AS user_name, products.name AS product_name, products.photo, products.price,transaction.status 
          FROM ((transaction
          INNER JOIN products ON transaction.id_product = products.id)
          INNER JOIN users ON transaction.id_user = users.id)
          WHERE transaction.status = 1`,
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

const insertTransaction = ({ idProduct, idUser, status}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO transaction(id_product, id_user, status)VALUES($1, $2, $3)',
      [idProduct, idUser, status],
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

const updateTransaction = () => {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE transaction SET status = 2 WHERE status = 1',
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
