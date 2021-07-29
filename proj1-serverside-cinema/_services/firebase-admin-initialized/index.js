const admin = require('firebase-admin')

const isEmulator = process.env.FUNCTIONS_EMULATOR
const projectId = process.env.GCLOUD_PROJECT

if (isEmulator || projectId) {
  admin.initializeApp() // CF or emulator
} else {
  const serviceAccount = require('./service-account.json')
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
}

module.exports = {
  admin,
  db: admin.firestore()
}
