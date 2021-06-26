// Import libraries
const express = require('express')

// Setup app
const app = express()

// Middleware
app.use(express.static('public'))

// Routes
// localhost:3000

app.get('/', (req, res) => {
  res.send('Better world')
})

// localhost:3000/html

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
// localhost:3000/json

app.get('/json', (req, res) => {
  res.json(
    {
      technologies: [
        'JavaScript', 'Noodle', 'Express']
    })
})

// localhost:3000/admin/grades
app.get('/admin/grades', (req, res) => {
  res.sendStatus(401)
})

// localhost:3000/api/grades

app.get('/api/grades', (req, res) => {
  res.status(401).send('Crepper! Oh man!')
})

// localhost:3000/boredom
app.get('/boredom', (req, res) => {
  res.status(404).send('Sorry-you just be a friend!')
})
// localhost3000/html-pic
app.get('/html-pic', (req, res) => {
  res.send(`
    <html>
      <body>
    <h1>hello boii</h1>
    <img src="/cat.jpg" width="300" />
  </body>
  </html>
  `)
})


// Lab
app.get('/Lab', (req, res) => {
  res.send(`
  <html><body>
  <li>1. <a href="/profiles/Foon">/profiles/Foon</a></li>
  <li>2. <a href="/api/profiles/Foon">/api/profiles/Foon</a></li>
  <li>3. <a href="/cat-simulator">/cat-simulator</a></li>
  <li>4. <a href="/admin/grades">/admin/grades</a> AND <a href="/api/grades">/api/grades</a> AND <a href="/boredom">/boredom</a></li>
</body></html>
  `)
}
)

// Localhost:3000/Foon
app.get('/api/profiles/Foon', (req, res) => {
  res.json(
    {
      name: [
        'Pisanu'],
      nickName: ['Foon'],
      Like: ['Cat', 'C#', 'C++'],
      motto: ['Lean', 'Intelligence', 'Happiness']

    })
})

// Cat-simulator
app.get('/cat-simulator', (req, res) => {
  res.send(`
    <html>
    <head><link rel="stylesheet" href="/styles.css"></head>
      <body class="cats">
      <a href="/pet-the-cat">Pet the cat</a><br>
    <img src="/cat.jpg" width="300" /></br>
  </body>
  </html>
  `)
})
// Cat-result
app.get('/pet-the-pat', (req, res) => {
  res.send(`
    <html>
    <head><link rel="stylesheet" href="/styles.css"></head>
      <body class="cats"> 
      <a href="/cat-simulator">Ignore cat</a>
      <br>
    <img src="/catpop.jpg" width="300" />
    </br>
  </body>
  </html>
  `)
}
)
app.get('/profiles/Foon', (req, res) => {
  res.send(`
      <html><body>
        <ul>
          <li>Nickname: Foon</li>
          <li>Likes: Web Developer,Borker,Stonks</li>
          <li>Motto: Lean', 'Intelligence', 'Happiness </li>
        </ul>
      </body></html>
    `)
}
)
// Start server
const PORT = 3000
app.listen(PORT, () => console.log(
  `listening on http://localhost:${PORT}`))