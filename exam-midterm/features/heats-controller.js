const { db } = require('../_services/firebase-admin-initialized')

const heatRecordCreateForm = async (req, res) => {
  res.render('heat-record-create-form')
}

module.exports = {
  heatRecordCreateForm,
}
