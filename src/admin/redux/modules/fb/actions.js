// https://firebase.google.com/docs/database/web/read-and-write
// https://firebase.google.com/docs/database/web/lists-of-data

//https://console.firebase.google.com/project/tpyts-test/database/tpyts-test/data

import * as Actions from 'rdx/actions'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const fbConfig = {
  apiKey: 'AIzaSyCoreTl2luCABh07LNLd_2uET-94fRbZdU',
  authDomain: 'tpyts-test.firebaseapp.com',
  databaseURL: 'https://tpyts-test.firebaseio.com',
  projectId: 'tpyts-test',
  storageBucket: 'tpyts-test.appspot.com',
  messagingSenderId: '528636007709',
  appId: '1:528636007709:web:172ac058b5240f49f13df4'
}

let providers
let shops
let services
let dealers

export const fbInit = () => (dispatch, getState) => {

  dispatch(Actions.uiSetMessage({
    text: 'FIREBASE CONNECTING...'
  }))

  const app = firebase.initializeApp(fbConfig)

  /* Providers */

  providers = firebase.database().ref('providers')  
  providers.on('child_added', data => dispatch(Actions.dataProviderAdded(data)))
  providers.on('child_changed', data => dispatch(Actions.dataProviderChanged(data)))
  providers.on('child_removed', data => dispatch(Actions.dataProviderRemoved(data)))

  providers.once('value', data => dispatch(Actions.dataProvidersReady(data)))
}

export const FB_INIT_SUCCESS = 'FB_INIT_SUCCESS'
export const fbInitSuccess = data => ({ type: FB_INIT_SUCCESS })

export const fbAddProvider = data => (dispatch, getState) => {

  dispatch(Actions.uiSetMessage({
    text: 'adding new provider...'
  }))

  providers.push()
  .set(data)
  .then(() => dispatch(Actions.uiSetMessage({
    text: 'added provider'
  })))
}