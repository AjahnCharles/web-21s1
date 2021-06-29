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
 
// Start server
const PORT = 3000
app.listen(PORT, () => console.log(
 `listening on http://localhost:${PORT}`))