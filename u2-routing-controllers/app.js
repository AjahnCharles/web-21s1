const express = require('express')
const { urlencoded, json } = require('body-parser')
const { getUserByQuery, getUserByPath, getUserByForm, search } = require('./features/userController')
const { index } = require('./features/indexController')
const { getProducts } = require('./features/productController')
const { getRGB } = require('./features/rgbController')
const { getTemp } = require('./features/tempController')
const { getEcho, getEchoByform } = require('./features/echoController')
const { logger } = require('./_services/logger')

const app = express()

// Middlewares
app.use(urlencoded({ extended: false }))
app.use(json()) // function that create middle
app.use(logger) // logger = a middleware

// Routes
app.get('/users', getUserByQuery)
app.get('/users/Search', search)
app.get('/users/:username', getUserByPath)
app.post('/users', getUserByForm)
app.get('/', index)
app.get('/products/search', getProducts)
app.post('/products', getProducts)
app.get('/rgb', getRGB)
app.get('/:u1-to-:u2/:t1', getTemp)
app.get('/echo', getEcho)
app.post('/echo', getEchoByform)
const PORT = 3000
app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`))
