import React, {
  useEffect
} from 'react'
import { Provider } from 'react-redux'
import store from 'rdx/store'
import * as Actions from 'rdx/actions'
import { initUISavedState } from 'utils/localstorage'
import Message from 'common/components/message'
import 'antd/dist/antd.css'
import Shops from './showcases/shops'
import Categories from './showcases/categories'
import Search from './showcases/search'

const App = props => {

  useEffect(() => {

    store.dispatch(Actions.uiSetMessage({ text: 'Loading...' }))

    initUISavedState() 

    store.dispatch(Actions.fbInit())
  }, [])
  
  return <Provider store={ store }>
    <div className="Showcases">
      <Shops />
      <Categories />
      <Search />
    </div>
    <Message />
  </Provider>
}

export default App