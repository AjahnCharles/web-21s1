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

//Start server กำหนดpostแทนในlo post
const POST = 3000
app.listen(POST, () => console.log(`listening on http://localhost:${POST}`))
