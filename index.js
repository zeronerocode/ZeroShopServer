require('dotenv').config()
const express = require('express')
const cors = require('cors')
const errorHandler = require('http-errors')
const helmet = require('helmet')
const xss = require('xss-clean')
const path = require('path')
const morgan = require('morgan')

const serverRoute = require('./src/routes')
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())
app.use(xss())
app.use(morgan('env'))
app.use(helmet({
  crossOriginResourcePolicy: false,
})) 

app.use('/', serverRoute)


app.use('/img', express.static(path.join(__dirname, '/upload')))

app.all('*', (req, res, next) => {
  next(new errorHandler.NotFound())
})

app.use((err, req, res, next) => {
  const messError = err.message || 'Internal Server Error'
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message: messError
  })
})
app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`)
})
