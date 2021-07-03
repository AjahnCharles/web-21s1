const getTemp = (req, res) => {
  const u1 = req.params.u1.toUpperCase()
  const u2 = req.params.u2.toUpperCase()
  const t1 = req.params.t1
  let t2
  if (u1 === u2) {
    t2 = t1
  } else if (u1 === 'C') {
    t2 = t1 * 9 / 5 + 32
  } else if (u1 === 'F') {
    t2 = (t1 - 32) * 5 / 9
  }
  res.send(`${parseFloat(t1).toFixed(1)} ${u1} = ${parseFloat(t2).toFixed(1)} ${u2}`)
}
module.exports = {
  getTemp
}
