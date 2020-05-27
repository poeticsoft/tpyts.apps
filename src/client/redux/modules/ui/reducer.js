import immutableUpdate from 'immutable-update'
import * as Actions from './actions'

const initialState = {
  message: {
    type: 'info',
    text: 'Loading...'
  },
  shopactive: null,
  serviceactive: null
}

const reducers = { 
  
  [Actions.UI_SHOW_MESSAGE]: (state, action) => {

    let newMessage = action.payload.message
    newMessage.type = newMessage.type || 'info'
    
    return immutableUpdate(
      state,
      { message: newMessage }
    )
  },
  
  [Actions.UI_HIDE_MESSAGE]: (state, action) => immutableUpdate(
    state,
    { message: null }
  ),
  
  [Actions.UI_SET_INITIAL_STATE]: (state, action) => immutableUpdate(
    state,
    action.payload.state
  ),
  
  [Actions.UI_SET_SHOP_ACTIVE]: (state, action) => immutableUpdate(
    state,
    { shopactive: action.payload.shopid }
  ),  
  
  [Actions.UI_SET_SERVICE_ACTIVE]: (state, action) => immutableUpdate(
    state,
    { serviceactive: action.payload.serviceid }
  )
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer