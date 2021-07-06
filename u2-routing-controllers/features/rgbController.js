const rgb = (req, res) => {
  // Inputs (query string)
  const r = parseInt(req.query.r) || 0
  const g = parseInt(req.query.g) || 0
  const b = parseInt(req.query.b) || 0

  // Calculate avg & contrasting color
  const avg = Math.round((r + g + b) / 3)
  const color = avg < 128 ? '#fff' : '#000'

  // Send response
  res.send(`<html><body style="background-color: rgb(${r}, ${g}, ${b}); color: ${color}">
    <p>red: ${r}, green: ${g}, blue: ${b}</p>
    <p>avg: ${avg}
  </body></html>`)
}

module.exports = {
  rgb
}
