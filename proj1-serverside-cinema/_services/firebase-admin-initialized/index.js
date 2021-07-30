const admin = require('firebase-admin')

const isEmulator = process.env.FUNCTIONS_EMULATOR
const projectId = process.env.GCLOUD_PROJECT

const modeArg = process.argv.find(arg => arg.startsWith('--mode='))

if (isEmulator || projectId) {
  // Running on CF (cloud or emulator)
  admin.initializeApp()
} else if (modeArg) {
  // Script (targeting emulator)
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'
  admin.initializeApp({ projectId: 'proj1-cinema-emu' }) // running Firestore emulator
} else {
  // Other (nodemon or script targeting production)
  const serviceAccount = require('./service-account.json') // production
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
}

module.exports = {
  admin,
  db: admin.firestore()
}
