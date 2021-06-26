// Import libraries
const express = require('express')

// Setup app
const app = express()

// Middleware
app.use(express.static('public'))

// Routes
// Localhost:3000
app.get('/',(req, res) => {
  res.send('better world')
})

// Localhost:3000/html
app.get('/html', (req, res) => {
  res.send(`
    <html><body>
      <h1>Technologies</h1>
      <ul>
        <li>JavaScript</li>
        <li>Node</li>
        <li>Express</li>
      </ul>
    </body></html>
  `)
})

// Localhost:3000/json
app.get('/json', (req, res) => {
  res.json({ 
    technologies: [
      'javascript', 'typescript', 'Node', 'Express'
    ]
  })
})

// Localhost:3000/status
app.get('/status', (req, res) => {
  res.sendStatus(403)
})

app.get('/status-200', (req, res) => {
  res.sendStatus(200)
})

app.get('/status-400', (req, res) => {
  res.sendStatus(400)
})

// Localhost:3000/status2
app.get('/status', (req, res) => {
  res.status(500).send('Oh no, something went wrong')
})

// Localhost:3000/html-pic
app.get('/html-pic', (req, res) => {
  res.send(`
  <html><body>
    <h1>Hello</h1>
    <img src="/images/cat.jpg" width="300" />
  </html></body>
  `)
})

// Start server
const PORT = 3000
app.listen(PORT, () => console.log(
  `listening on http://localhost:${PORT}`))