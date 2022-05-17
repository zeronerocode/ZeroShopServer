const express = require('express')
const router = express.Router()
const productController = require('../controller/products')
const upload = require('../middleware/upload')

const { protect, isSeller } = require('../middleware/auth')

router
  .get('/:id', productController.getProductById)
  .get('/', productController.getAllProduct)
  .post('/', protect, isSeller, upload.single('photo'), productController.insertProduct)
  .patch('/:id', protect, isSeller, upload.single('photo'), productController.updateProduct)
  .delete('/:id', productController.deleteProduct)
module.exports = router
