const express = require('express')

const app = express()

// Middleware
app.use(express.static('public'))

// Routes
// TODO later

const PORT = 3000
app.listen(PORT,
  () => console.log(`Listening: http://localhost:${PORT}`))
