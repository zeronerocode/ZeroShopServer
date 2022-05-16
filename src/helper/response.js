const response = (res, result, status, message, pagination) => {
    const resultPrint = {}
    resultPrint.status = 'success'
    resultPrint.statuCode = status || 500
    resultPrint.message = message || null
    if (pagination)resultPrint.pagination = pagination
    resultPrint.data = result
    res.status(status).json(resultPrint)
  }
  
  module.exports = {
    response
  }  