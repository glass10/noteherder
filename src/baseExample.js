import Rebase from 're-base'
import firebase from 'firbase/app'
import database from 'firebase/database'

const app = firebase.initializeApp({
    apiKey: "YOUR API KEY",
    authDomain: "YOUR-APP.firebaseapp.com",
    databaseURL: "https://YOUR_APP.firebaseio.com",
    projectId: "YOUR-APP",
    storageBucket: "YOUR-APP.appspot.com",
    messagingSenderId: "YOUR SENDER ID"
  })

  const db = database(app)

  export default Rebase.createClass(db)