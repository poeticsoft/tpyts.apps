import store from 'rdx/store'
import * as Actions from 'rdx/actions'

const saveState = (mod, data) => {

  try {

    const serializedState = JSON.stringify(data);

    localStorage.setItem('TPYTS_' + mod + '_State', serializedState);

  } catch(e) {

    console.log(e)
  }
}

const loadState = (mod) => {

  try {

    const serializedState = localStorage.getItem('TPYTS_' + mod + '_State'); 

    if (serializedState === null) {

      return null;
    }   

    return JSON.parse(serializedState);

  } catch (err) {

    return null;
  }
}

store.subscribe(() => {

  return
  
  const UIState = { ...store.getState().ui }
  delete UIState.message
  delete UIState.map
  delete UIState.gallery
  saveState('UI', UIState);

  const WPState = { ...store.getState().wp }
  saveState('WP', WPState);  
})

export const initSavedState = () => {  

  /*
  const savedUIState = loadState('UI')
  savedUIState !== null &&
  store.dispatch(Actions.uiSetInitialState(savedUIState))

  const savedWPState = loadState('WP')
  savedWPState !== null &&
  store.dispatch(Actions.wpSetInitialState(savedWPState))
  */

  store.dispatch(Actions.wpInit())
}

