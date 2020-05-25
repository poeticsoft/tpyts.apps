import immutableUpdate from 'immutable-update'
import * as actions from './actions'

const initialState = {
} 

const reducers = { 
  
  [actions.FB_INIT_SUCCESS]: (state, action) => immutableUpdate(
    state,
    action.payload.data
  )
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer