import store from 'rdx/store'
import * as Actions from 'rdx/actions'

const savedslots = {
  'ui',
  'cart',
  'order',
  'location',
  'wp'
}

const saveState = (mod, data) => {

  try {

    delete data.message
    delete data.map
    delete data.gallery
    data.search = {
      status: 'hidden',
      searchtext: '',
      results: []
    }
    data.showcase = null

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

export const initSavedState = () => { 

  const savedUIState = loadState('UI')

  savedUIState !== null &&
  store.dispatch(Actions.uiSetInitialState(savedUIState))

  const savedWPState = loadState('WP')
  savedWPState !== null &&
  store.dispatch(Actions.wpSetInitialState(savedWPState))

  store.subscribe(() => {
    
    const UIState = { ...store.getState().ui }
    saveState('UI', UIState);

    const WPState = { ...store.getState().wp }
    WPState.ready = false
    saveState('WP', WPState);  
  })

  store.dispatch(Actions.wpRefresh())

  /*

  setTimeout(() => { 

    store.dispatch(Actions.wpRefresh())

  }, 3000) // Splash

  */
}

