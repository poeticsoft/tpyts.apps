import React, {
  useEffect
} from 'react'
import { Provider } from 'react-redux'
import store from 'rdx/store'
import { initSavedState } from 'utils/localstorage'
import Message from 'common/components/message'
import 'antd/dist/antd.less'
import Showcase from './showcase'
import Map from './map'
import Gallery from './gallery'
import Cart from './cart'
import Tools from './tools'
import Splash from './splash'

const App = props => {

  useEffect(initSavedState, [])
  
  return <Provider store={ store }>
    <Showcase />
    <Cart />
    <Map />
    <Gallery />
    <Tools />
    <Splash />
    <Message />
  </Provider>
}

export default App