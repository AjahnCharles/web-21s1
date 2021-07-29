const functions = require('firebase-functions')
const { app } = require('./app')

exports.demo = functions.https.onRequest(app)
