const express = require('express')
const router = express.Router()
const productController = require('../controller/products')
const upload = require('../middleware/upload')
const {hitCacheProductDetail, clearCacheProductDetial} = require('../middleware/redis')

// const { protect, isSeller } = require('../middleware/auth')

router
  .get('/:id',hitCacheProductDetail, clearCacheProductDetial, productController.getProductById)
  .get('/', productController.getAllProduct)
  .post('/', upload.single('photo'), productController.insertProduct)
  .patch('/:id', upload.single('photo'), productController.updateProduct)
  .delete('/:id', productController.deleteProduct)
module.exports = router
