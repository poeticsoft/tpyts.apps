import React, {
  useEffect
} from 'react'
import { debounce } from 'lodash'
import { Provider } from 'react-redux'
import store from 'rdx/store'
import { initSavedState } from 'rdx/localstorage'
import Message from 'common/components/message'
import 'antd/dist/antd.less'
import Showcase from './showcase'
import PopMap from './pop-map'
import PopGallery from './pop-gallery'
import PopService from './pop-service'
import Cart from './cart'
import Tools from './tools'
import Splash from 'common/components/splash'
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
    <PopMap />
    <PopGallery />
    <PopService />
    <Cart />
    <Tools />
    <Splash />
    <Message />
  </Provider>
}

export default App