const pool = require('../config/db')

const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT products.*, category.name AS name_category FROM products INNER JOIN category ON products.id_category = category.id WHERE products.id = $1', [id],
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

const getAllProduct = ({ offset, limit, sortdata, search }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM products WHERE name ILIKE $3 ORDER BY $4 LIMIT $1 OFFSET $2',
      [limit, offset, `%${search}%`, sortdata,],
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

const insertProduct = ({ name, description, stock, price, idCategory, createdAt, photo }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO products(name, description, stock, price, id_category, created_at, photo)VALUES($1, $2, $3, $4, $5, $6, $7)',
      [name, description, stock, price, idCategory, createdAt, photo],
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

const updateProduct = ({name, description, stock, price, idCategory, photo, updateAt, id}) => {
  console.log(name)
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE products SET name=$1, description=$2, stock=$3, price=$4, id_category=$5, photo=$6, updated_at=$7  WHERE id = $8',
      [name, description, stock, price, idCategory, photo, updateAt, id],
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
  })
}

const deleteProduct = (id) => {
  return pool.query('DELETE FROM products WHERE id = $1', [id])
}

const countProduct = () => {
  return pool.query('SELECT COUNT(*) AS total FROM products')
}

module.exports = {
  getProductById,
  getAllProduct,
  insertProduct,
  countProduct,
  updateProduct,
  deleteProduct
}
