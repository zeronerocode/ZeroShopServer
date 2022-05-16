const transactionModel = require('../model/transaction')
const createError = require('http-errors')
const errorServ = new createError.InternalServerError()

const getTransactionById = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await transactionModel.getTransactionById(id)
    res.status(200).json({
      data: result
    })
  } catch (error) {
    console.log(error)
    next(errorServ)
  }
}

const getAllTransaction = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const sortdata = req.query.sort || 'id'
    const typeSort = req.query.typesort || 'ASC'
    const search = req.query.search
    const offset = (page - 1) * limit
    const result = await transactionModel.getAllTransaction({ offset, limit, sortdata, typeSort, search })

    // pagination
    const { rows: [count] } = await transactionModel.countTransaction()
    const totalData = parseInt(count.total)
    const totalPage = Math.ceil(totalData / limit)

    res.status(200).json({
      pagination: {
        currentPage: page,
        limit,
        totalData,
        totalPage
      },
      data: result
    })
  } catch (error) {
    console.log(error)
    next(errorServ)
  }
}

const insertTransaction = (req, res, next) => {
  const { idUser, idProduct, status } = req.body
  const data = {
    idUser,
    idProduct,
    status,
    createdAt: new Date()
  }
  transactionModel.insertTransaction(data)
    .then(() => {
      res.status(201).json({
        data
      })
    })
    .catch((error) => {
      console.log(error)
      next(errorServ)
    })
}

const deleteTransaction = (req, res, next) => {
  const id = req.params.id
  transactionModel.deleteTransaction(id)
    .then(() => {
      res.json({
        message: 'data berhasil di hapus'
      })
    })
    .catch((error) => {
      console.log(error)
      next(new createError.InternalServerError())
    })
}

const updateTransaction = (req, res, next) => {
  const id = req.params.id
  const { idProduct, idUser, status } = req.body
  transactionModel.updateTransaction(idProduct, idUser, status, id)
    .then(() => {
      res.status(201).json({
        idProduct, idUser, status
      })
    })
    .catch((error) => {
      console.log(error)
      next(new createError.InternalServerError())
    })
}

module.exports = {
  getTransactionById,
  getAllTransaction,
  insertTransaction,
  deleteTransaction,
  updateTransaction
}
