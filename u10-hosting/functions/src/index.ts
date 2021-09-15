import * as functions from 'firebase-functions'
import { app } from './app'

export const example = functions.https.onRequest(app)
