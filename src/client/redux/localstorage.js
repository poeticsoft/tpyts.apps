import store from 'rdx/store'
import * as Actions from 'rdx/actions'
import { debounce } from 'lodash'

const savedelay = 1000
export const localstorageslots = {
  ui: [
    'showcase',
    'stores'
  ],
  cart: [
    'openstate',
    'actualstep'
  ],
  order: [
    'services'
  ],
  location: 'all',
  wp: [
    'slot',
    'slotbyid'
  ]
}

const saveStates = () => {

  const state = store.getState()

  try {

    const states = Object.keys(localstorageslots)
    .reduce((savestates, slot) => {

      if(localstorageslots[slot] == 'all') {

        savestates[slot] = state[slot]

      } else {

        savestates[slot] = localstorageslots[slot]
        .reduce((savefields, field) => {
          
          savefields[field] = state[slot][field]

          return savefields
        }, {})
      }

      return savestates
    }, {})

    localStorage.setItem('TPYTS_States', JSON.stringify(states));

  } catch(e) {

    console.log(e)
  }
}

export const initSavedState = () => {

  const serializedState = localStorage.getItem('TPYTS_States'); 
  const savedStates =  serializedState ? JSON.parse(serializedState) : null;

  savedStates &&
  store.dispatch(Actions.uiSetInitialStates(savedStates))

  store.subscribe(debounce(saveStates, savedelay))

  store.dispatch(Actions.wpRefresh())
}

