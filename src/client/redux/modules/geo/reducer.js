import immutableUpdate from 'immutable-update'
import * as Actions from './actions'

const initialState = {
  predictionsstatus: null,  // validating, warning, success, error
  autocompletepredictions: [],
  geolocation: {
    lat: null,
    lng: null
  }
}

const reducers = {   
  
  [Actions.GEO_SET_STATUS]: (state, action) => immutableUpdate(
    state,
    { ...action.payload.data }
  ),
  
  [Actions.GEO_SET_AUTOCOMPLETE_PREDICTIONS]: (state, action) => immutableUpdate(
    state,
    { 
      autocompletepredictions: action.payload.results
    }
  ),
  
  [Actions.GEO_SET_LOCATION]: (state, action) => immutableUpdate(
    state,
    { 
      geolocation: action.payload.location
    }
  )
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer