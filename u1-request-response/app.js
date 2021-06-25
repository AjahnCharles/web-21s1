const express = require('express')

const app = express()

// Middleware
app.use(express.static('public'))

// Routes (guided)
app.get('/', (req, res) => {
  res.send('better world')
})

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

app.get('/json', (req, res) => {
  res.json({
    technologies: ['javascript', 'typescript', 'Node', 'Express']
  })
})

app.get('/status', (req, res) => {
  res.sendStatus(403)
})

app.get('/status-custom-message', (req, res) => {
  res.status(500).send('Oh no, something went wrong')
})

app.get('/html-pic', (req, res) => {
  res.send(`
    <html><body>
      <h1>Hello</h1>
      <img src="/images/cat.jpg" width="300" />
    </body></html>
  `)
})

// Routes (lab)
app.get('/labs', (req, res) => {
  res.send(`<html><body>
    <li>1. <a href="/profiles/charles">/profiles/charles</a></li>
    <li>2. <a href="/api/profiles/charles">/api/profiles/charles</a></li>
    <li>3. <a href="/cat-simulator">/cat-simulator</a></li>
    <li>4. <a href="/admin/grades">/admin/grades</a> AND <a href="/api/grades">/api/grades</a> AND <a href="/boredom">/boredom</a></li>
  </body></html>`)
})

app.get('/profiles/charles', (req, res) => {
  res.send(`
  <html><body>
  <h1>Charles Allen</h1>
  <p>Nickname: Chaz</p>
  <p>Likes: Web Development, Agile, Lean</p>
  <p>Motto: Health; Happiness; Excellence</p>
  </body></html>
  `)
})

app.get('/api/profiles/charles', (req, res) => {
  res.json({
    name: 'Charles Allen',
    nickname: 'Chaz',
    likes: ['Web Development', 'Agile', 'Lean'],
    motto: 'Health; Happiness; Excellence'
  })
})

app.get('/cat-simulator', (req, res) => {
  res.send(`
  <html>
  <head><link rel="stylesheet" href="/styles.css"></head>
  <body class="cats">
    <a href="/cat-result">Pet the cat</a>
    <img src="/images/cat-happy.jpg" width="500" />
  </body>
  </html>
  `)
})

app.get('/cat-result', (req, res) => {
  res.send(`
  <html>
  <head>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body class="cats">
    <a href="/cat-simulator">Ignore the cat</a>
    <img src="/images/cat-angry.jpg" width="500" />
  </body>
  </html>
  `)
})

app.get('/admin/grades', (req, res) => {
  res.sendStatus(401)
})

app.get('/api/grades', (req, res) => {
  res.status(401).send('Invalid OAuth token')
})

app.get('/boredom', (req, res) => {
  res.status(404).send('Sorry - we don\'t have that here!')
})

// Start server
const PORT = 3000
app.listen(PORT, () => console.log(
  `listening on http://localhost:${PORT}`))
