const express = require('express')
const { urlencoded, json } = require('body-parser')
const { logger } = require('./_services/logger')

const { getUserByQuery, getUserByPath, getUserByForm, search } = require('./features/userController')
const { index } = require('./features/indexController')
const { productSearch } = require('./features/productController')
const { rgb } = require('./features/rgbController')
const { temperatureConversion } = require('./features/tempController')
const { echo, echoForm } = require('./features/echoController')

const app = express()

// Middlewares
app.use(urlencoded({ extended: false }))
app.use(json()) // json() = function that creates middleware
app.use(logger) // logger = a middleware

// Routes
app.get('/', index)

app.get('/users', getUserByQuery)
app.get('/users/search', search)
app.get('/users/:username', getUserByPath)
app.post('/users', getUserByForm)

app.get('/products/search', productSearch)
app.get('/rgb', rgb)
app.get('/:unit1-to-:unit2/:temp1', temperatureConversion)
app.get('/echo', echoForm)
app.post('/echo', echo)

const PORT = 3000
app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`))
