const express = require('express')
const router = express.Router()
const categoryRoute = require('./category')
const productRoute = require('./products')
const usersRoute = require('./user')
const transactionRoute = require('./transaction')

router
  .use('/category', categoryRoute)
  .use('/products', productRoute)
  .use('/user', usersRoute)
  .use('/transaction', transactionRoute)

module.exports = router
