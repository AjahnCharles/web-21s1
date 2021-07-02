const express = require('express')
const { urlencoded, json } = require('body-parser')
const { logger } = require('./_services/logger')
const { index } = require('./features/indexController')
const { getUserByQuery, getUserByPath, search, getUserByForm } = require('./features/userController')
const { getProduct } = require('./features/productController')
const { getRGB } = require('./features/rgbControlle')
const { getTemp } = require('./features/tempConreoller')
const { getEcho, getEchoByForm } = require('./features/echoController')

const app = express()

// Middleware
app.use(urlencoded({ extended: false }))
app.use(json()) // json () = function that cerates middleware
app.use(logger) // logger = a middleware

// Route
app.get('/', index)
app.get('/users', getUserByQuery)
app.get('/users/search', search)
app.get('/users/:username', getUserByPath)
app.post('/users', getUserByForm)

// Routelab
app.get('/products/search', getProduct)
app.get('/rgb', getRGB)
app.get('/:unit1-to-:unit2/:temp1', getTemp)
app.get('/echo', getEcho)
app.post('/echo', getEchoByForm)

const POST = 3000
app.listen(POST,
  () => console.log(`Listening: http://localhost:${POST}`))
