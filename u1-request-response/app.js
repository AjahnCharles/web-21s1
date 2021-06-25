
// Import libraries
const express = require('express')

// Setup app
const app = express()

// Middleware
app.use(express.static('public'))


//Routes
app.get('/', (req,res) => {
    res.send(`<html><body>
    <h1>Welcome</h1>
    <li><a href="/labs">/labs</a></li>
  </body></html>
`)
})

//localhost:3000/labs
app.get('/labs', (req,res) => {
  res.send(`
  <html><body>
  <li>1. <a href="/profiles/jay">/profiles/jay</a></li>
  <li>2. <a href="/api/profiles/jay">/api/profiles/jay</a></li>
  <li>3. <a href="/cat-simulator">/cat-simulator</a></li>
  <li>4. <a href="/admin/grades">/admin/grades</a> AND <a href="/api/grades">/api/grades</a> AND <a href="/boredom">/boredom</a></li>
</body></html>
`)
})

//localhost:3000/profils/jay
app.get('/profiles/jay', (req,res) => {
  res.send(`
  <html><body>
        <h1>Yodsathon Norin</h1>
        <h2>Nickname: jay </h2>  
        <h2>Like: Novel,anime </h2>  
        <h2>Motto: Happiness </h2>  
      </html></body>
      `)
})

//localhost:3000/api/profiles/jay
app.get('/api/profiles/jay', (req, res) => {
  res.json({
    name: 'Yodsathon Norin',
    nickname: 'jay',
    Like: ['novel', 'Anime'],
    Motto: 'Happiness'
  })
  })

//localhost:3000/admin/grades
  app.get('/admin/grades', (req, res) => {
      res.sendStatus(401)
  })

  //localhost:3000/api/grades
  app.get('/api/grades', (req, res) => {
    res.status(401).send('Have something wrong,please check it!')
})

  //localhost:3000/boredom
  app.get('/boredom', (req, res) => {
    res.status(404).send('Error 404 Not Found Page')
})

//localhost:3000/cat-simulator
app.get('/cat-simulator', (req, res) => {
    res.send(`
      <html><head><link rel="stylesheet" href="/cat.css"></head>
      <body class="cats">
        <h1><a href="/cat-result">Pet a cat</a></h1>
        <img src="/cat_boring.jpg" />
      </html></body>
    `)
   })

   //localhost:3000/cat-result
app.get('/cat-result', (req, res) => {
  res.send(`
    <html><head><link rel="stylesheet" href="/cat.css"></head>
    <body class="cats">
      <h1><a href="/cat-simulator">Ignore a cat</a></h1>
      <img src="/cat_pet.jpg" />
    </html></body>
  `)
 })
   

// Start server
const PORT = 3000
app.listen(PORT, () => console.log(
  `listening on http://localhost:${PORT}`))
