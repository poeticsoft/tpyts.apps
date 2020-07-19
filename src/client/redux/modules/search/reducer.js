import immutableUpdate from 'immutable-update'
import * as Actions from './actions'

const initialState = {
  status: 'hidden',
  text: '',
  results: []
}

const reducers = { 

  [Actions.UI_SET_SEARCH_STATUS]: (state, action) => immutableUpdate(
    state,
    action.payload.status
  )
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer