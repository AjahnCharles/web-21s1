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

// localhost:3000/laps
app.get('/laps', (req, res) => {
  res.send(`
<html><body>
  <li>1. <a href="/profiles/wanpen">/profiles/wanpen</a></li>
  <li>2. <a href="/api/profiles/wanpen">/api/profiles/wanpen</a></li>
  <li>3. <a href="/cat-simulator">/cat-simulator</a></li>
  <li>4. <a href="/admin/grades">/admin/grades</a> AND <a href="/api/grades">/api/grades</a> AND <a href="/boredom">/boredom</a></li>
  </body></html>
  `)
})

// localhost:3000/profiles/wanpen
app.get('/profiles/wanpen', (req, res) => {
  res.send(`

  <h1>Wanpen Phunma</h1>
  <h3>nickname: Oil</h3>
  <h3>likes: Kpop, Movies, Listen to music</h3>
  <h3>motto: Where there's a will, there's a way</h3>

 `)
})

// localhost:3000/api/profiles/wanpen
app.get('/api/profiles/wanpen', (req, res) => {
  res.send(`
{
  "name" : "Wanpen Phunma",
  "nickname": "Oil",
  "likes": [
    "Kpop", 
    "Movies", 
    "Listen to music",
  ],
  "motto": Where there's a will, there's a way"
}
 `)
})

// Localhost:3000/cat-simulator
app.get('/cat-simulator', (req, res) => {
  res.send(`
  <html>
  <head><link rel="stylesheet" href="/styles.css"></head>
  <body class="cats">
  <a href='http://localhost:3000/cat-result'> Pet the cat </a><br><br>
    <img src="/images/cat-simulator.jpg" width="500" />
  </html></body>
  `)
})

// Localhost:3000/cat-simulator
app.get('/cat-result', (req, res) => {
  res.send(`
  <html>
  <head><link rel="stylesheet" href="/styles.css"></head>
  <body class="cats">
  <a href='http://localhost:3000/cat-simulator'> Ignore the cat </a><br><br>
    <img src="/images/cat-result.jpg" width="500" />
  </html></body>
  `)
})

// Localhost:3000/admin/grades
app.get('/admin/grades', (req, res) => {
  res.sendStatus(401)
})

// Localhost:3000/api/grades
app.get('/api/grades', (req, res) => {
  res.status(401).send('Invalid OAuth token')
})

// Localhost:3000/boredom
app.get('/boredom', (req, res) => {
  res.status(404).send('Sorry - we dont have that here!')
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