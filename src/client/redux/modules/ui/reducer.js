import immutableUpdate from 'immutable-update'
import * as Actions from './actions'

const initialState = {  
  message: {},
  window:{}, 
  showcase: 'stores',
  stores: {
    storesactive: []
  },
  map: {
    active: false,
    location:{
      lat: 0,
      lng: 0
    },
    zoom: 6,
    data: {}
  },
  gallery: {
    active: true,
    slides: [],
    data: {
      title: 'gallery'
    }
  },
  serviceinfo: {
    active: true,
    serviceid: null
  },
  terms: {
    status: 'hidden'
  } 
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
  
  [Actions.UI_SET_WINDOW]: (state, action) => immutableUpdate(
    state,
    {
      window: action.payload.data
    }
  ), 
  
  [Actions.UI_HIDE_MESSAGE]: (state, action) => immutableUpdate(
    state,
    { message: null }
  ),
  
  [Actions.UI_SET_INITIAL_STATE]: (state, action) => immutableUpdate(
    state,
    action.payload.state
  ), 
  
  [Actions.UI_SET_STORES_ACTIVE]: (state, action) => immutableUpdate(
    state,
    { 
      stores: {
        storesactive: action.payload.storeids
      }
    }
  ),

  [Actions.UI_SET_MAP_STATE]: (state, action) => immutableUpdate(
    state,
    { 
      map: action.payload.data
    }
  ),

  [Actions.UI_SET_GALLERY_STATE]: (state, action) => immutableUpdate(
    state,
    { 
      gallery: action.payload.data
    }
  ),

  [Actions.UI_SET_SERVICE_INFO_STATE]: (state, action) => immutableUpdate(
    state,
    { 
      serviceinfo: action.payload.data
    }
  ),

  [Actions.UI_SET_SHOWCASE_ACTIVE]: (state, action) => immutableUpdate(
    state,
    { 
      showcase: action.payload.showcase
    }
  )
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer