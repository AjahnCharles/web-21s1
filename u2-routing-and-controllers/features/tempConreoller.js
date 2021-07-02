const getTemp = (req, res) => {
  const unit1 = req.params.unit1.toUpperCase()
  const unit2 = req.params.unit2.toUpperCase()
  const temp1 = req.params.temp1

  let temp2
  if (unit1 === unit2) {
    temp2 = temp1
  } else if (unit1 === 'C') {
    temp2 = temp1 * 9 / 5 + 32
  } else if (unit1 === 'F') {
    temp2 = (temp1 - 32) * 5 / 9
  }

  res.send(`${parseFloat(temp1).toFixed(1)} ${unit1} = ${parseFloat(temp2).toFixed(1)} ${unit2}`)
}

module.exports = {
  getTemp
}
