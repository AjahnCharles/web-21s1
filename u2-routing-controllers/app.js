// import opject in file
const express = require('express')
const { urlencoded, json } = require('body-parser')
const { getUserByQuery, getUserByPath, getUserByForm, search } = require('./features/userController')
const { logger } = require('./_services/logger')
const { index } = require('./features/indexController')
const { getproduct } = require('./features/productController')
const { getrgb } = require('./features/rgbController')
const { gettemp } = require('./features/tempController')
const { getecho, getechoByform } = require('./features/echoController')

const app = express()

// middlewares โค๊ดที่ใช้
app.use(urlencoded({ extended: false }))
app.use(json()) // json() = function that creates middleware
app.use(logger) // logger = a middleware

// Routes เชื่อมไปยังตัวควบคุม
// index lab
app.get('/', index)
// User
app.get('/users', getUserByQuery)
app.get('/users/search', search)
app.get('/users/:username', getUserByPath)
app.post('/users', getUserByForm)
// Lab
app.get('/products/search', getproduct)
app.get('/rgb', getrgb)
app.get('/:u1-to-:u2/:t1', gettemp)
app.get('/echo', getecho)
app.post('/echo', getechoByform)

// setlocahost
const PORT = 3000
app.listen(PORT,
  () => console.log(`Listening: http://localhost:${PORT}`))
