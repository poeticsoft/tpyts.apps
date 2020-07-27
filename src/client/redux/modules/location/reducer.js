import immutableUpdate from 'immutable-update'
import * as Actions from './actions'

const initialState = {
  valid: false,
  form: {    
    name: null,
    tel: null,
    address: null
  },
  extra: {
    when: null,
    time: null, 
    comments: null
  },
  addresstolocationstatus: null, // null, searching, ok, ko
  addresslocation: {
    lat: null,
    lng: null
  }
}

const reducers = {   
  
  [Actions.LOCATION_SET_INITIAL_STATE]: (state, action) => immutableUpdate(
    state,
    action.payload.data
  ),
  
  [Actions.LOCATION_SET]: (state, action) => immutableUpdate(
    state,
    action.payload.location
  ),  
  
  [Actions.LOCATION_ERROR]: (state, action) => immutableUpdate(
    state,
    action.payload.location
  ), 
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer