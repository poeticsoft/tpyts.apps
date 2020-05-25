import React, {
  useEffect
} from 'react'
import { Provider } from 'react-redux'
import store from 'rdx/store'
import * as Actions from 'rdx/actions'
import { initUISavedState } from 'utils/localstorage'
import Message from 'common/components/message'
import { AdminMenu } from './adminmenu'
import { AdminFront } from './adminfront'

const App = props => {

  useEffect(() => {

    store.dispatch(Actions.uiSetMessage({ text: 'Loading...' }))

    initUISavedState() 

    store.dispatch(Actions.fbInit())
    store.dispatch(Actions.wpInit())
  }, [])
  
  return <Provider store={ store }>
    <AdminMenu />
    <AdminFront />
    <Message />
  </Provider>
}

export default App