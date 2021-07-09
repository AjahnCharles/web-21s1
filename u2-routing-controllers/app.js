    const express = require('express')
    const { urlencoded, json } = require('body-parser')
    const { getUserByQuery, getUserByPath, getUserByForm, search } = require('./features/userController')
    const { logger } = require('./_services/logger')
    const app = express()

    //Middleware
    app.use(urlencoded({ extended: false }))
    app.use(json())
    app.use(logger)

    // Routes
    app.get('/users', getUserByQuery)
    app.get('/users/search', search)
    app.get('/users/:username', getUserByPath)
    app.post('/users', getUserByForm)
    const PORT = 3000
    app.listen(PORT,
  () => console.log(`Listening: http://localhost:${PORT}`))