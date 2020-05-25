import immutableUpdate from 'immutable-update'
import * as Actions from './actions'

const initialState = {
  data: null,
  ready: false
} 

const reducers = { 

  [Actions.WP_DATA_READY]: (state, action) => {  

    return immutableUpdate(
      state,
      {
        ready: true,
        data: action.payload.data
      }
    )
  }
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer