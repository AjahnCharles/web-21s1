import fb from 'firebase/app'
import config from './firebase-config'
import 'firebase/firestore'

fb.initializeApp(config)

export const firebase = fb
export const db = firebase.firestore()
