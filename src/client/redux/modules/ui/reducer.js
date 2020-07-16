import React from 'react'
import immutableUpdate from 'immutable-update'
import Order from 'comps/cartsteps/order'
import Location from 'comps/cartsteps/location'
import Payment from 'comps/cartsteps/payment'
import * as Icons from '@ant-design/icons'
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
  cart: {
    openstate: 'hidden',
    actualstep: 'order',
    steps: {
      'order': {        
        index: 0,
        name: 'Pedido',
        comp: Order,
        icon: <Icons.UnorderedListOutlined />,
        valid: true
      },
      'location': {
        index: 1,
        name: 'Donde?',
        comp: Location,
        icon: <Icons.EnvironmentOutlined />,
        valid: false
      },
      'payment': {
        index: 2,
        name: 'Pago',
        comp: Payment,
        icon: <Icons.EuroOutlined />,
        valid: false
      }
    }
  },
  order: {
    services: [],
    /*
      {
        serviceid: id,
        index: index in list
        quantity: 1, // for process with/out complements
        complementos: [
          complementoid
        ]
      }
    */
    errors: {}
  },    
  location: {
    name: null,
    tel: null,
    mail: null,
    address: null,
    location: {
      status: null, // null, searching, ok, ko
      lat: null,
      lng: null
    },
    when: null,
    time: null, 
    comments: null
  },
  payment: {
    card: {
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
    }
  }, 
  search: {
    status: 'hidden',
    text: '',
    results: []
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
  ),

  [Actions.UI_SET_SEARCH_STATUS]: (state, action) => immutableUpdate(
    state,
    { 
      search: action.payload.status
    }
  ),

  [Actions.UI_ADD_SERVICE_TO_ORDER]: (state, action) => {

    const services = immutableUpdate(
      [],
      state.order.services
    )

    services.push(action.payload.data)
    
    return immutableUpdate(
      state,
      { 
        order: {
          services: services
        }
      }
    )
  },

  [Actions.UI_REMOVE_SERVICE_FROM_ORDER]: (state, action) => {

    const newState = immutableUpdate(
      state,
      {}
    ) 

    console.log(newState.order.services[action.payload.serviceid])

    delete newState.order.services[action.payload.serviceid]

    return newState
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
  
  [Actions.UI_SET_CARD_DATA]: (state, action) => { console.log(action.payload.data); return immutableUpdate(
    state,
    { 
      cart: {
        card: action.payload.data
      }
    }
  ) }, 
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer