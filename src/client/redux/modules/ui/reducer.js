import React from 'react'
import immutableUpdate from 'immutable-update'
import Order from 'comps/cartsteps/order'
import Location from 'comps/cartsteps/location'
import Payment from 'comps/cartsteps/payment'
import * as Icons from '@ant-design/icons'
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
  cart: {
    opened: false,
    actualstep: 'order',
    steps: {
      'order': {        
        index: 0,
        name: 'Pedido',
        comp: Order,
        icon: <Icons.UnorderedListOutlined />
      },
      'location': {
        index: 1,
        name: 'Donde?',
        comp: Location,
        icon: <Icons.EnvironmentOutlined />
      },
      'payment': {
        index: 2,
        name: 'Pago',
        comp: Payment,
        icon: <Icons.EuroOutlined />
      }
    },
    totalservices: 0,
    totalprice: 0,
    card: {
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
    }
  },
  order: {
    services: {},
    address: {},
    location: {},
    errors: {}
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
  
  [Actions.UI_SET_INITIAL_STATE]: (state, action) => {

    // console.log(action.payload.state)

    return  immutableUpdate(
      state,
      action.payload.state
    )
  },
  
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
  },
  
  [Actions.UI_SET_CART_STATUS]: (state, action) => immutableUpdate(
    state,
    { 
      cart: action.payload.status
    }
  ), 
  
  [Actions.UI_SET_ORDER_LOCATION]: (state, action) => immutableUpdate(
    state,
    { 
      order: {
        location: action.payload.location
      }
    }
  ),  
  
  [Actions.UI_SET_ORDER_LOCATION_ERROR]: (state, action) => immutableUpdate(
    state,
    { 
      order: {
        location: action.payload.location
      }
    }
  ), 
  
  [Actions.UI_SET_CARD_DATA]: (state, action) => immutableUpdate(
    state,
    { 
      cart: {
        card: action.payload.data
      }
    }
  ), 
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer