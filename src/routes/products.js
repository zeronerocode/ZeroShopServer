const express = require('express')
const router = express.Router()
const productController = require('../controller/products')
const upload = require('../middleware/upload')

const {protect} = require('../middleware/auth')

router
  .get('/:id', productController.getProductById)
  .get('/', productController.getAllProduct)
  .post('/', protect, upload.single('photo'), productController.insertProduct)
  .patch('/:id', productController.updateProduct)
  .delete('/:id', productController.deleteProduct)
module.exports = router
