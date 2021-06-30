//Import libraries 
const express = require('express')

//Setup app 
const app = express()

//Middleware 
app.use(express.static('public'))

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

//localhost:3000/Json
  app.get('/json', (req, res) => {
    res.json(
        {
            technologies: [
                'javascript',`typescript`, 'Noodle', 'Express'
            ]
        })
  })

//localhost:3000/status
  app.get(`/status` ,(req,res) => {
      res.sendStatus(403)
  })

  app.get(`/status-200` ,(req,res) => {
    res.sendStatus(200)
})

app.get(`/status-400` ,(req,res) => {
    res.sendStatus(400)
})

    //localhost:3000/status2
    app.get(`/status2` ,(req,res) => {
        res.status(500).send(`Oh no,something went wrong`)
    })

//locahost:3000/html-pit
    app.get(`/html-pit` ,(req,res) => {
        res.send(`
        <html><body>
            <h1>Hello</h1>
            <img src="/images/cat.jpg" width="300" />
        </html></body>   
        `)
    })

//LabIndex
//localhost:3000/labs
    app.get(`/labs` ,(req,res) => {
        res.send(`
        <html>
            <body>
                <li>1. <a href="/profiles/joker">/profiles/joker</a></li>
                <li>2. <a href="/api/profiles/joker">/api/profiles/joker</a></li>
                <li>3. <a href="/cat-Simulator">/cat-simulator</a></li>
                <li>4. <a href="/admin/grades">/admin/grades</a> AND <a href="/api/grades">/api/grades</a> 
                AND <a href="/boredom">/boredom</a></li>
            </body>
        </html>
        `)
    })    

//localhost:3000/profiles/Joker
    app.get(`/profiles/joker`,(req,res) => {
        res.send(`
        <html><body>
            <hr><h1>Mr.Kanokpol Tranfong<h1><hr>
            <h4><br>Nickname: Joker 
            <br>Age : 21
            <br>Like : Computer 
            <br>Motto: Make better not make
            </h4>
        </body></html>
        `)
    })

//localhost:3000/Api/Profiles/Joker
    app.get(`/api/profiles/joker`,(req,res) => {
        res.send(`
        <html><body>
        {
            <br>&emsp;"Name": "Kanokpol Tranfong",
            <br>&emsp;"Nickname": "joker",
            <br>&emsp;"Age": "21",
            <br>&emsp;"Like": [
                <br>&emsp;&emsp;"Computer",
                <br>&emsp;&emsp;"Music",
                <br>&emsp;&emsp;"Movie"
            <br>&emsp;] ,
            <br>&emsp;"Motto": "Make better not make"
        <br>}    
        </body></html>
        `)
    })

//localhost:3000/Cat-Simulator
    app.get(`/cat-simulator`,(req,res) => {
        res.send(`
        <html>
            <head><link rel="stylesheet" href="/styles.css"></head>
                <body class="cats">
                    <a href="/cat-result">Pet the cat</a><br>
                    <img src="/images/British.jpg"/>
                </body>
        </html>
        `)
    })

//localhost:3000/cat-result
    app.get(`/cat-result`,(req,res) => {
        res.send(`
        <html>
            <head><link rel="stylesheet" href="/styles.css"></head>
                <body class="cats">
                    <a href="/cat-simulator">Ignore the cat</a><br>
                    <img src="/images/Ignore.jpg"/>
                </body>
        </html>
        `)
    })

//localhost:3000/Admin/Grades
    app.get(`/admin/grades` ,(req,res) => {
        res.sendStatus(401)
    })

//localhost:3000/Api/Grades
    app.get(`/api/grades` ,(req,res) => {
        res.status(401).send(`
        <html><body><h1>Invalid OAuth token</h1></body></html>`)
    })

//localhost:3000/Boredom
    app.get(`/boredom` ,(req,res) => {
        res.status(404).send(`
        <html><body><h1>Sorry - we don't that here!</h1></body></html>`)
    })    

//Start server 
const POST = 3000
app.listen(POST, () => console.log(`listening on http://localhost:${POST}`))