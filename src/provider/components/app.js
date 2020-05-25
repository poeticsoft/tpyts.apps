import React, {
  useEffect
} from 'react'
import {  Provider } from 'react-redux'
import store from 'rdx/store'
import * as Actions from 'rdx/actions'
import { initUISavedState } from 'utils/localstorage'
import Manage from './manage'
import Message from './message'
import logocolor from 'assets/img/logo-color.png'

const App = props => {

  useEffect(() => {

    store.dispatch(Actions.uiSetMessage({ text: 'Loading...' }))

    initUISavedState() 

    store.dispatch(Actions.fbInit())
  }, [])
  
  return <Provider store={ store }>
    <img src={ logocolor } />
    <Manage />
    <Message />
  </Provider>
}

export default App