const functions = require('firebase-functions')
const { app } = require('./app')

exports.demo = functions.region('asia-southeast2').https.onRequest(app)
