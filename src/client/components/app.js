import React, {
  useEffect
} from 'react'
import { Provider } from 'react-redux'
import store from 'rdx/store'
import * as Actions from 'rdx/actions'
import { initUISavedState } from 'utils/localstorage'
import Message from 'common/components/message'
import 'antd/dist/antd.css'
import Stores from './showcases/stores'
import Categories from './showcases/categories'
import Search from './showcases/search'
import Map from './map'
import Gallery from './gallery'
import Cart from './cart'

const App = props => {

  useEffect(() => {

    store.dispatch(Actions.uiSetMessage({ text: 'Loading...' }))

    initUISavedState()

    store.dispatch(Actions.wpInit())

  }, [])
  
  return <Provider store={ store }>
    <Stores />
    <Cart />
    <Map />
    <Gallery />
    <Message />
  </Provider>
}

export default App