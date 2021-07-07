const index = (_req, res) => {
  res.send(`<html><head>
    <style type="text/css">
      a, a:visited, .nav form input[type="submit"] { color: blue; font-family: serif; font-size: 12pt; }
      .nav form { display: inline-block; }
      .nav form input[type="submit"] { background: none; border: none; margin: 0; padding: 0;
        text-decoration: underline; cursor: pointer; }
      .hint { color: #999999; font-size: 10pt; }
      .hint:before { content: '('; }
      .hint:after { content: ')'; }
    </style>
  </head><body class="nav">
    <p>Group:</p>
    <ul>
      <li><a href="/users?id=2">/users?id=2</a></li>
      <li><a href="/users/parinyak62">/users/parinyak62</a></li>
      <li><a href="/users/search">/users/search</a></li>
      <li>
        <form action="/users" method="POST">
          <input type="hidden" name="search" value="oa" />
          <input type="submit" value="/users" /> <span class="hint">POST</span>
        </form>
      </li>
    </ul>
    <p>Lab:</p>
    <ul>
      <li><a href="/products/search?q=asus&page=3">/search?q=asus&page=3</a></li>
      <li><a href="/rgb?r=255&g=120">/rgb?r=255&g=120</a></li>
      <li><a href="/f-to-c/40">/f-to-c/40</a></li>
      <li><a href="/echo">/echo</a></li>
      <li>
        <form action="/echo" method="POST">
          <input type="hidden" name="name" value="Everyone" />
          <input type="hidden" name="message" value="I <3 Web Dev" />
          <input type="submit" value="/echo" /> <span class="hint">POST</span>
        </form>
      </li>
    </ul>
  </body></html>`)
}

module.exports = {
  index
}
