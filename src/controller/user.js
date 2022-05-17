const createError = require('http-errors')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const { findEmail, insert, deleteUser } = require('../model/user')
const { response } = require('../helper/response')
const jwt = require('jsonwebtoken')
const authHelper = require('../services/auth')
const { sendEmail } = require('../services/mail')

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body
    const { rowCount } = await findEmail(email)

    const salt = bcrypt.genSaltSync(8)
    const hashPassword = bcrypt.hashSync(password, salt)

    if (rowCount) {
      return next(createError(403, 'Email Sudah Terdaftar'))
    }

    const data = {
      id: uuidv4(),
      email,
      password: hashPassword,
      name
    }
    await insert(data)
    sendEmail(email)
    response(res, data, 201, 'user resgiter berhasil')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { rows: [user] } = await findEmail(email)
    // const user = rows[0]
    if (!user) {
      return response(res, null, 403, 'email atau password anda salah')
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return response(res, null, 403, 'email atau password anda salah')
    }
    delete user.password

    const payload = {
      email: user.email,
      role: user.roles
    }
    
    // generate token
    user.token = authHelper.generateToken(payload)
    user.refreshToken = authHelper.gerateRefreshToken(payload)

    response(res, user, 201, 'anda berhasil login')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}

const delUser = (req, res, next) => {
  const email = req.params.email
  deleteUser(email)
  .then(() => {
    response(res, email, 201, 'anda berhasil login')
  })
  .catch((error) => {
    console.log(error)
    next(new createError.InternalServerError())
  })
}

const refreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken
  const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT)
  const payload = {
    email: decoded.email,
    role: decoded.role
  }
  const result = {
    refreshToken: authHelper.gerateRefreshToken(payload)
  }
  response(res, result, 200, 'update token berhasil')
}
module.exports = {
  register,
  login,
  delUser,
  refreshToken
}
