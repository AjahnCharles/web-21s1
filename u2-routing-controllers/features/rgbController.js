const getRGB = (req, res) => {
  const r = parseInt(req.query.r) || 0
  const g = parseInt(req.query.g) || 0
  const b = parseInt(req.query.b) || 0
  const avg = Math.round((r + g + b) / 3)

  if (avg < 128) {
    res.send(`<html>
    <body style="background-color: rgb(${r}, ${g}, ${b});"> <span style="color:#FFFFFF">  red: ${r}, green: ${g}, blue: ${b}  <br>
     avg: ${avg} </span>
     </body>
     </html>`)
  } else {
    res.send(`<html>
                    <body style="background-color: rgb(${r}, ${g}, ${b});">red: ${r}, green: ${g}, blue: ${b} <br> avg: ${avg} </body>
            </html>`)
  }
}

module.exports = {
  getRGB
}