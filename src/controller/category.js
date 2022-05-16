const createError = require('http-errors')
const categoryModel = require('../model/category')
const errorServ = new createError.InternalServerError()
exports.getCategory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    const result = await categoryModel.select({ offset, limit })

    // paginatino
    const { rows: [count] } = await categoryModel.countCategory()
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

exports.insertCategory = (req, res, next) => {
  const { name } = req.body

  const data = {
    name
  }
  categoryModel.insert(data)
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

exports.deleteCategory = (req, res, next) => {
  const id = req.params.id
  categoryModel.deleteCategory(id)
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

exports.updateCategory = (req, res, next) => {
  const id = req.params.id
  const { name } = req.body

  categoryModel.updateCategory(name, id)
    .then(() => {
      res.status(201).json({
        id,
        name
      })
    })
    .catch((error) => {
      console.log(error)
      next(new createError.InternalServerError())
    })
}

exports.getCategoryByid = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await categoryModel.getCategoryById(id)
    res.status(200).json({
      data: result
    })
  } catch (error) {
    console.log(error)
    next(errorServ)
  }
}
