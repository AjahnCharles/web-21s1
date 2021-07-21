const admin = require('firebase-admin')
const serviceAccount = require('./service-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

module.exports = {
  admin,
  db: admin.firestore()
}
