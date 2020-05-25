import store from 'rdx/store'
import * as Actions from 'rdx/actions'
import {
  throttle
} from 'lodash'

const saveState = data => {

  try {

    const serializedState = JSON.stringify(data);
    localStorage.setItem('BracnoriaUlledMemoriesUIState', serializedState);

  } catch(e) {

    console.log(e)
  }
}

const loadState = () => {

  try {

    const serializedState = localStorage.getItem('BracnoriaUlledMemoriesUIState');    
    if (serializedState === null) {
      return {};
    }

    return JSON.parse(serializedState);

  } catch (err) {

    return {};
  }
}

store.subscribe(throttle(() => {

  const UIState = { ...store.getState().ui }
  UIState.responsive = {
    window: {
      w: 0,
      h: 0,
      o: 'none'
    },
    device: ''
  }

  saveState(UIState);
  
}, 1000))

export const initUISavedState = () => {  

  const savedUIState = loadState()
  if (savedUIState !== null) {
    
    store.dispatch(Actions.uiSetInitialState(savedUIState)) 
  }
}

