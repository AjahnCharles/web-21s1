const temperatureConversion = (req, res) => {
  // Inputs (path params)
  const u1 = req.params.unit1.toUpperCase()
  const u2 = req.params.unit2.toUpperCase()
  const t1 = parseFloat(req.params.temp1) || 0

  // Validate units
  const allowedUnits = new Set(['C', 'F'])
  if (!allowedUnits.has(u1) || !allowedUnits.has(u2)) return res.status(400).send('<html><body><h1>Invalid units</h1></body></html>')

  // Calculate result temperature
  let t2
  if (u1 === u2) {
    t2 = t1
  } else if (u1 === 'C') {
    t2 = t1 * 9 / 5 + 32
  } else if (u1 === 'F') {
    t2 = (t1 - 32) * 5 / 9
  }

  // Send response
  res.send(`<html><body>
    <p>${t1.toFixed(1)} ${u1} = ${t2.toFixed(1)} ${u2}</p>
  </body></html>`)
}

module.exports = {
  temperatureConversion
}
