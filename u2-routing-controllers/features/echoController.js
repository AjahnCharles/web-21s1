const getEcho = (_req, res) => {
  res.send(`<html><head>
  <style type="text/css">
    label, button { display: inline-block; margin-top: 16px; }
    input, textarea { width: 300px; }
    textarea { height: 150px; }
  </style>
</head><body><form action="/echo" method="POST">
  <label for="echo-name">Name: </label><br />
  <input id="echo-name" name="name" /><br />

  <label for="echo-message">Message: </label><br />
  <textarea id="echo-message" name="message"></textarea><br />

  <button type="submit">Submit</button>
</form></body></html>
</html>`)
}

const getEchopost = (req, res) => {
  const name = req.body.name
  const message = req.body.message

  res.send(`Hello ${name}! <br><br>
  You Said: <br>
  <blockquote>${message}</blockquote>`)
}
module.exports = { getEcho, getEchopost }
