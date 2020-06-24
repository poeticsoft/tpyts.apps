import immutableUpdate from 'immutable-update'
import * as Actions from './actions'

const initialState = {
  apistatus: 'ready', // ready loading error
  autocompletepredictions: [],
  addresslocation: {}
}

const reducers = {   
  
  [Actions.GEO_SET_API_STATUS]: (state, action) => immutableUpdate(
    state,
    { 
      apistatus: action.payload.status
    }
  ),
  
  [Actions.GEO_SET_AUTOCOMPLETE_PREDICTIONS]: (state, action) => immutableUpdate(
    state,
    { 
      apistatus: 'ready',
      autocompletepredictions: action.payload.results
    }
  ),
  
  [Actions.GEO_SET_ADDRESS_LOCATION]: (state, action) => immutableUpdate(
    state,
    { 
      apistatus: 'ready',
      addresslocation: action.payload.location
    }
  )
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer