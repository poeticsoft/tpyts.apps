// https://firebase.google.com/docs/database/web/read-and-write
// https://firebase.google.com/docs/database/web/lists-of-data

//https://console.firebase.google.com/project/tpyts-test/database/tpyts-test/data

import * as Actions from 'rdx/actions'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import basedata from './basedata.json'

const fbConfig = {
  apiKey: 'AIzaSyCoreTl2luCABh07LNLd_2uET-94fRbZdU',
  authDomain: 'tpyts-test.firebaseapp.com',
  databaseURL: 'https://tpyts-test.firebaseio.com',
  projectId: 'tpyts-test',
  storageBucket: 'tpyts-test.appspot.com',
  messagingSenderId: '528636007709',
  appId: '1:528636007709:web:172ac058b5240f49f13df4'
}

const fbSlots = {
  providers: null,
  shops: null,
  services: null,
  dealers: null,
  dealertypes: null,
  orders: null
}  

export const fbInit = () => (dispatch, getState) => {

  dispatch(Actions.fbSetBaseData(basedata))

  /*

  dispatch(Actions.uiSetMessage({
    text: 'Conecting Firebase...'
  }))

  const app = firebase.initializeApp(fbConfig)

  Object.keys(fbSlots)
  .forEach(key => {
    
    fbSlots[key] = firebase.database().ref(key)  
    fbSlots[key].on('child_added', data => dispatch(Actions.fbEvent({ event: 'fbAdded', slot: key, data: data })))
    fbSlots[key].on('child_changed', data => dispatch(Actions.fbEvent({ event: 'fbChanged', slot: key, data: data })))
    fbSlots[key].on('child_removed', data => dispatch(Actions.fbEvent({ event: 'fbRemoved', slot: key, data: data })))
    fbSlots[key].once('value', data => dispatch(Actions.fbEvent({ event: 'fbReady', slot: key, data: data })))
  })

  */
}

/* Test Data */

export const FB_SET_BASE_DATA = 'FB_SET_BASE_DATA'
export const fbSetBaseData = data => ({
  type: FB_SET_BASE_DATA,
  payload: { data: data }
})

/* Data events */

export const fbEvent = data => (dispatch, getState) => { 

  const fbState = getState().fb

  dispatch(Actions[data.event]({
    slot: data.slot,
    data: data.data
  }))
}

export const FB_ADDED = 'FB_ADDED'
export const fbAdded = data => ({
  type: FB_ADDED,
  payload: { data: data }
})

export const FB_CHANGED = 'FB_CHANGED'
export const fbChanged = data => ({
  type: FB_CHANGED,
  payload: { data: data }
})

export const FB_REMOVED = 'FB_REMOVED'
export const fbRemoved = data => ({
  type: FB_REMOVED,
  payload: { data: data }
})

export const FB_READY = 'FB_READY'
export const fbReady = data => ({
  type: FB_READY,
  payload: { data: data }
})

/*

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

*/