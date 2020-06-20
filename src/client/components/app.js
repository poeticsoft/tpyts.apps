import React, {
  useEffect
} from 'react'
import { debounce } from 'lodash'
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
import * as Actions from 'rdx/actions'

const resize = () => {

  store.dispatch(Actions.uiSetWindow({
    w: window.innerWidth,
    h: window.inerHeight
  }))
}

const App = props => {

  useEffect(() => {
    
    initSavedState()

    window.addEventListener('resize', debounce(resize, 500))

  }, [])
  
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