// Import libraries
const express = require('express')
// Setup app
const app = express()
// Middleware
app.use(express.static('public'))
// Routes
//localhost:3000
app.get('/', (req, res) => {
    res.send('better world')
   })
//localhost:3000/html
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
//localhost:3000/json
   app.get('/json', (req, res) => {
    res.json({
    technologies: [
    'JavaScript', 'Node', 'Express'
    ]
    })
   })
//localhost:3000/status
app.get('/status', (req, res) => {
    res.sendStatus(403)
   })
//localhost:3000/status2
 app.get('/status2', (req, res) => {
   res.Status(500).send('Oh no, something went wrong')
  })
 
 //localhost:3000/html-pic
 app.get('/html-pic', (req, res) => {
    res.send(`
    <html><body>
    <h1>Hello</h1>
    <img src="/images/hello.jpg" width="300" />
    </html></body>
    `)
   })
//labs
app.get('/labs', (req, res) => {
   res.send(`
   <html>
      <body>
      <li>1. <a href="/profiles/oat">/profiles/oat</a></li>
      <li>2. <a href="/api/profiles/oat">/api/profiles/oat</a></li>
      <li>3. <a href="/cat-simulator">/cat-simulator</a></li>
      <li>4. <a href="/admin/grades">/admin/grades</a> AND <a href="/api/grades">/api/grades</a> AND <a href="/boredom">/boredom</a></li>
      </body>
    </html>
    `)
   })
   //localhost:3000/profiles/oat
   app.get('/profiles/oat', (req, res)=>{
      res.send(`
      <html><body>
      <h1>Nuttapol Thafun<h1>
      <h4>Nickname : Oat<br>
         Age:22 <br>
         Like: read manga 
         Motto: Well done is better than well said.
         <h4>
         </body></html>
      `)

   })
   //localhost:3000/api/profiles/oat
   app.get(`/api/profiles/oat`, (req, res) => {
      res.send(
      {
         "name": "Nuttapol Thafun",
         "Nicknam": "Oat",
         "Age": "22",
         "Like": ["read manga",
            "basketball",
            "game"
         
          ],
           "motto": "Well done is better than well said."

      }
      )
   })
   //localhost:3000/
   app.get('/cat-simulator', (req, res) => {
      res.send(`
      <html>
         <head><link rel="stylesheet" href="/styles.css"></head>
            <body class="cats">
               <a href="/cat-result">Pet the cat</a><br>
               <img src="https://upload.wikimedia.org/wikipedia/commons/9/9e/British_shorthair_cat.jpg"
               </body>
      </html>
      `)
   })
   //localhost:3000/
   app.get('/cat-result', (req, res) => {
      res.send(`
      <html>
         <head><link rel="stylesheet" href="/styles.css"></head>
            <body class="cats">
               <a href="/cat-simulator">Pet the cat</a><br>
               <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Hannibal_Poenaru_-_Nasty_cat_%21_%28by-sa%29.jpg"
               </body>
      </html>
      `)
   })
   //localhost:3000/
   app.get(`/admin/grades`,(req, res) => {
      res.sendStatus(401)
   })
   //localhost:3000/
   app.get(`/api/grades`,(req, res) => {
      res.status(401).send(`Invalid OAuth token`)
   })
   //localhost:3000/
   app.get(`/boredom`,(req, res) => {
      res.status(404).send(`Sorry - we don't that here!`)
   })
   

 // Start server
const PORT = 3000
app.listen(PORT, () => console.log(
 `listening on http://localhost:${PORT}`))