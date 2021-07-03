const express = require('express')
const { urlencoded, json } = require('body-parser')
const { getUserByQuery, getUserByPath, getUserByForm, search } = require('./features/userController')
const { logger } = require('./_services/logger')
const { indexC } = require('./features/indexController')
const { ProductSearch } = require('./features/productController')
const { RGB } = require('./features/rgbController')
const { getTemp } = require('./features/tempController')
const { getEcho, getEchoByForm } = require('./features/echoController')

const app = express()

// Middlewares
app.use(urlencoded({ extended: false }))
app.use(json()) // json() = function that creates Middlewares
app.use(logger) // logger = Middlewares

// Routes
app.get('/', indexC)
app.get('/users', getUserByQuery)
app.get('/users/search', search)
app.get('/users/:username', getUserByPath)
app.post('/users', getUserByForm)
app.get('/products/search', ProductSearch)
app.get('/rgb', RGB)
app.get('/:u1-to-:u2/:t1', getTemp)
app.get('/echo', getEcho)
app.post('/echo', getEchoByForm)

const PORT = 3000
app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`))
