const express = require('express')
const { urlencoded, json } = require('body-parser')
const { getUserByQuery, getUserByPath, getUserByForm, search } = require('./features/userController')
const { logger } = require('./_services/logger')
const { index } = require('./features/indexController')
const { getProduct } = require('./features/productController')
const { getRGB } = require('./features/rgbController')
const { getTemp } = require('./features/tempController')
const { getEcho, getEchoByPost } = require('./features/echoController')

const app = express()

// Middlewares
app.use(urlencoded({ extended: false }))
app.use(json()) // json() = function that creates middleware
app.use(logger) // logger = a middleware

// Routes
app.get('/users', getUserByQuery)
app.get('/users/search', search)
app.get('/users/:username', getUserByPath)
app.post('/users', getUserByForm)

// Routes-Lab
app.get('/', index)
app.get('/products/search', getProduct)
app.get('/rgb', getRGB)
app.get('/:u1-to-:u2/:t1', getTemp)
app.get('/echo', getEcho)
app.post('/echo', getEchoByPost)

const PORT = 3000
app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`))
