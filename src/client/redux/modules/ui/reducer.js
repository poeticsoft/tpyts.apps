import immutableUpdate from 'immutable-update'
import * as Actions from './actions'

const initialState = {
  message: {
    type: 'info',
    text: 'Loading...'
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
  order: {
    services: {}
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

  [Actions.UI_ADD_SERVICES_TO_ORDER]: (state, action) => {

    const serviceQuantity = state.order.services[action.payload.data.serviceid] || 0
    const newServiceQuantity = serviceQuantity + action.payload.data.quantity
    
    return immutableUpdate(
      state,
      { 
        order: {
          services: {
            [action.payload.data.serviceid]: newServiceQuantity
          }
        }
      }
    )
  }
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer