import React, {
  useEffect
} from 'react'
import { debounce } from 'lodash'
import { Provider } from 'react-redux'
import store from 'rdx/store'
import { initSavedState } from 'utils/localstorage'
import Message from 'common/components/message'
import 'antd/dist/antd.less'
import Splash from 'common/components/splash'
import Orders from './orders'
import * as Actions from 'rdx/actions'

const resize = () => {

  store.dispatch(Actions.uiSetWindow({
    w: window.innerWidth,
    h: window.inerHeight
  }))
}

const App = props => {

  console.log('app')

  useEffect(() => {
    
    initSavedState()

    window.addEventListener('resize', debounce(resize, 500))

  }, [])
  
  return <Provider store={ store }>
    <Orders />
    <Splash />
    <Message />
  </Provider>
}

export default App