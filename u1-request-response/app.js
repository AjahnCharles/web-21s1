// Import libraries
const express = require('express')

// Setup app
const app = express()

// Middleware
app.use(express.static('public'))

// Routes
// localhost:3000
app.get('/', (req, res) => {
res.send('better world')
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
  res.json({
          Technologies:['javascript','typescript', 'Node', 'Express']
      })  
})

// localhost:3000/status
app.get('/status', (req, res) => {
res.sendStatus(403)
})

app.get('/status-200', (req, res) => {
  res.sendStatus(200)
  })

  app.get('/status-400', (req, res) => {
    res.sendStatus(400)
    })

// localhost:3000/status2
app.get('/status2', (req, res) => {
  res.status(500).send('Oh no, something went wrong')
  })

// localhost:3000/html-pic
app.get('/html-pic', (req, res) => {
  res.send(`
  <html><body>
  <h1>Hello</h1>
  <img src="/images/cat.jpg" width="300" />
  </body></html>
  `)
})

// Labs
app.get('/labs' , (req, res) => {
res.send(`
<html><body>
  <li>1. <a href="/profiles/areeya">/profiles/areeya</a></li>
  <li>2. <a href="/api/profiles/areeya">/api/profiles/areeya</a></li>
  <li>3. <a href="/cat-simulator">/cat-simulator</a></li>
  <li>4. <a href="/admin/grades">/admin/grades</a> AND <a href="/api/grades">/api/grades</a> AND <a href="/boredom">/boredom</a></li>
</body></html>
`)
})  

// localhost:3000/profiles/areeya
app.get('/profiles/areeya', (req, res) => {
  res.send(`
  <html><body>
  <h1>Areeya Chanthawong</h1>
      <h2> Nickname : mook <br>
        Age: 22 <br>
        Likes: Graphic,Lean Web 
      </h2>
    
</body></html>
  `)
})

// localhost:3000/api/profiles/areeya
app.get('/api/profiles/areeya', (req, res) => {
  res.send(`
  "name": "Areeya Chanthawong",
  "nickname": "Mook",
  "like": [
    "Graphic",
    "Lean Web"
  ]
`)
})

//localhost:3000/cat-simulator
app.get('/cat-simulator', (req,res) => {
  res.send(`
  <html>
  <head><link rel="stylesheet" href="/styles.css"></head>
      <body class="cats">
              <a href="/cat-result">Pet the cat</a><br>
              <img src="/images/catt.jpg"/>
          </body>
  </html>
  `)
})

//localhost:3000/cat-result
app.get('/cat-result', (req,res) => {
  res.send(`
  <html>
  <head><link rel="stylesheet" href="/styles.css"></head>
                <body class="cats">
              <a href="/cat-simulator">Pet the cat</a><br>
              <img src="/images/catty.jpg"/>
          </body>
  </html>
  `)
})

//localhost:3000/admin/grades
app.get('/admin/grades', (req,res) => {
  res.sendStatus(401)
})


//localhost:3000/api/grades
app.get('/api/grades', (req,res) => {
  res.status(401).send('Invalid OAuth token')
})

//localhost:3000/boredom
    app.get('/boredom', (req,res) => {
        res.status(404).send(`Sorry - we don't that here!`)
    })    

    // Start server
const PORT = 3000
app.listen(PORT, () => console.log(
  `listening on http://localhost:${PORT}`))
