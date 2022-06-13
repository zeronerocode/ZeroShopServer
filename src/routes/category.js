const express = require('express')
const router = express.Router()
const categoryControler = require('../controller/category')

const { protect, isSeller } = require('../middleware/auth')

router
  .get('/', categoryControler.getCategory)
  .post('/', protect, isSeller, categoryControler.insertCategory)
  .get('/:id', categoryControler.getCategoryByid)
  .delete('/:id', categoryControler.deleteCategory)
  .patch('/:id', categoryControler.updateCategory)

module.exports = router
