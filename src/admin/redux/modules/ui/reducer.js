import immutableUpdate from 'immutable-update'
import * as actions from './actions'

const initialState = {
  message: {
    type: 'info',
    text: 'Loading...'
  }
} 

const reducers = { 
  
  [actions.UI_SET_MESSAGE]: (state, action) => {

    let newMessage = action.payload.message
    newMessage.type = newMessage.type || 'info'
    
    return immutableUpdate(
      state,
      {
        message: newMessage
      }
    )
  },
  
  [actions.UI_SET_INITIAL_STATE]: (state, action) => immutableUpdate(
    state,
    action.payload.state
  )
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer