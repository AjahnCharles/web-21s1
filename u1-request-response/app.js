//Import libraries รับข้อมูลของexpressมา
const express = require('express')

//Setup app เซ็ทให้ไฟล์=express
const app = express()

//Middleware giupdใช้ไฟล์ในpubilc
app.use(express.static('public'))

// Routes ส่งข้อความเข้าโดยตรง
//localhost:3000
app.get('/', (req, res) => {
    res.send('better world')
  })

// Routes ส่งข้อความเข้าโดยตรงโดยhtml
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
            <img src="/images/c.jpg" width="300" />
        </html></body>   
        `)
    })

//LabIndex
//localhost:3000/labs
    app.get(`/labs` ,(req,res) => {
        res.send(`
        <html>
            <body>
                <li>1. <a href="/profiles/bank">/profiles/bank</a></li>
                <li>2. <a href="/api/profiles/bank">/api/profiles/bank</a></li>
                <li>3. <a href="/cat-simulator">/cat-simulator</a></li>
                <li>4. <a href="/admin/grades">/admin/grades</a> AND <a href="/api/grades">/api/grades</a> AND <a href="/boredom">/boredom</a></li>
            </body>
        </html>
        `)
    })    

//localhost:3000/profiles/bank
    app.get(`/profiles/bank`,(req,res) => {
        res.send(`
        <html><body>
            <h1>Thanawat Samat<h1>
            <h4> Nickname: Bank <br>
                Age: 20 <br>
                Like: color black&blue. 
                Motto: nothing is impossible
            <h4>
        </body></html>
        `)
    })

    app.get(`/api/profiles/bank`,(req,res) => {
        res.send(
        {
            "name": "Thanawat Samat",
            "Nickname": "Bank",
            "Age": "20",
            "Like": ["color black&blue",
                "nature",
                "socializing"
            ],
            "motto": "nothing is impossible"
        }
        )
    })

//localhost:3000/cat-simulator
    app.get(`/cat-simulator`,(req,res) => {
        res.send(`
        <html>
            <head><link rel="stylesheet" href="/styles.css"></head>
                <body class="cats">
                    <a href="/cat-result">Pet the cat</a><br>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/British_shorthair_cat.jpg/800px-British_shorthair_cat.jpg">
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
                    <a href="/cat-simulator">Pet the cat</a><br>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Hannibal_Poenaru_-_Nasty_cat_%21_%28by-sa%29.jpg/755px-Hannibal_Poenaru_-_Nasty_cat_%21_%28by-sa%29.jpg">
                </body>
        </html>
        `)
    })

//localhost:3000/admin/grades
    app.get(`/admin/grades` ,(req,res) => {
        res.sendStatus(401)
    })

//localhost:3000/api/grades
    app.get(`/api/grades` ,(req,res) => {
        res.status(401).send(`Invalid OAuth token`)
    })

//localhost:3000/boredom
    app.get(`/boredom` ,(req,res) => {
        res.status(404).send(`Sorry - we don't that here!`)
    })    

//Start server กำหนดpostแทนในlo post
const POST = 3000
app.listen(POST, () => console.log(`listening on http://localhost:${POST}`))
