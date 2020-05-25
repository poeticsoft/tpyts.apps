import immutableUpdate from 'immutable-update'
import * as actions from './actions'

const initialState = {
  providers: {
    ready: false,
    list: {}
  }
} 

const reducers = { 
  
  [actions.DATA_PROVIDERS_READY]: (state, action) => immutableUpdate(
    state,
    {
      providers: {
        ready: true
      }
    }
  ),
  
  [actions.DATA_PROVIDER_ADDED]: (state, action) => immutableUpdate(
    state,
    {
      providers: {
        list: {
          [action.payload.data.key]: action.payload.data.val()
        }
      }
    }
  ),
  
  [actions.DATA_PROVIDER_CHANGED]: (state, action) => immutableUpdate(
    state,
    {
      providers: {
        list: {
          [action.payload.data.key]: action.payload.data.val()
        }
      }
    }
  ),
  
  [actions.DATA_PROVIDER_REMOVED]: (state, action) => {
    
    let newList = immutableUpdate(state, {})
    delete newList.providers.list[action.payload.data.key]
    
    return immutableUpdate(
      state,
      newList
    )
  }
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer