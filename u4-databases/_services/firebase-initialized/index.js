const firebase = require('firebase/app')
const config = require('./firebase-config')
require('firebase/firestore')

firebase.initializeApp(config)

module.exports = {
  firebase,
  db: firebase.firestore()
}
