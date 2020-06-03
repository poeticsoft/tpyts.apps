import store from 'rdx/store'
import * as Actions from 'rdx/actions'
import {
  throttle
} from 'lodash'

const saveState = data => {

  try {

    const serializedState = JSON.stringify(data);

    localStorage.setItem('TPYTSUIState', serializedState);

  } catch(e) {

    console.log(e)
  }
}

const loadState = () => {

  try {

    const serializedState = localStorage.getItem('TPYTSUIState'); 

    if (serializedState === null) {
      return {};
    }   

    return JSON.parse(serializedState);

  } catch (err) {

    return {};
  }
}

// store.subscribe(throttle(() => {
store.subscribe(() => {

  const UIState = { ...store.getState().ui }

  /* Clean state */
  delete UIState.message
  delete UIState.map
  delete UIState.gallery

  saveState(UIState);
  
// }, 1000))
})

export const initUISavedState = () => {  

  const savedUIState = loadState()
  if (savedUIState !== null) {

    store.dispatch(Actions.uiSetInitialState(savedUIState)) 
  }
}

