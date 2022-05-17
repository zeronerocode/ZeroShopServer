const express = require('express')
const router = express.Router()
const { register, login, delUser, refreshToken } = require('../controller/user.js')
// const { protect } = require('../services/auth.js')

router
  .post('/register', register)
  .post('/login', login)
  // .get('/profile', protect, profile)
  .post('/refresh-token', refreshToken)
  .delete('/:id', delUser)

module.exports = router
