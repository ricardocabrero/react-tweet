import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyCW1EvgSMuSA9T8r4XkqcxA52gnZvRdNbo",
  authDomain: "react-tweet-9bafc.firebaseapp.com",
  databaseURL: "https://react-tweet-9bafc.firebaseio.com",
  projectId: "react-tweet-9bafc",
  storageBucket: "",
  messagingSenderId: "372988002030",
  appId: "1:372988002030:web:bf60df624c1ef144"
});

import App from './components/App'

render(<App/>, document.getElementById('root'))