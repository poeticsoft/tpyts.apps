import immutableUpdate from 'immutable-update'
import * as Actions from './actions'

const initialState = { 
  services: [],
  toppingsserviceid: null,
  confirmremoveindex: null
} 

const reducers = {  
  
  [Actions.ORDER_SET_INITIAL_STATE]: (state, action) => immutableUpdate(
    state,
    action.payload.data
  ),

  [Actions.ORDER_ADD_SERVICE]: (state, action) => {

    let services = immutableUpdate(
      [],
      state.services
    )

    services.push(action.payload.data)
    
    return immutableUpdate(
      state,
      { 
        services: services
      }
    )
  },

  [Actions.ORDER_TRY_REMOVE_SERVICE]: (state, action) => {
    
    return immutableUpdate(
      state,
      { 
        confirmremoveindex: action.payload.index
      }
    )
  },

  [Actions.ORDER_REMOVE_SERVICE]: (state, action) => {

    let services = immutableUpdate(
      [],
      state.services
    )

    services.splice(action.payload.index, 1)
    
    return immutableUpdate(
      state,
      { 
        services: services,
        confirmremoveindex: null
      }
    )
  },
  
  [Actions.ORDER_SERVICE_TOPPINGS_LIST]: (state, action) => immutableUpdate(
    state,
    { 
      toppingsserviceid: action.payload.serviceid
    }
  ),

  [Actions.ORDER_SERVICE_ADD_TOPPING]: (state, action) => {

    let services = immutableUpdate(
      [],
      state.services
    )

    services[action.payload.serviceindex].toppings.push(action.payload.toppingid)
    
    return immutableUpdate(
      state,
      { 
        services: services
      }
    )
  },

  [Actions.ORDER_SERVICE_ADD_TOPPING]: (state, action) => {

    let services = immutableUpdate(
      [],
      state.services
    )

    services[action.payload.serviceindex].toppings.push(action.payload.toppingid)
    
    return immutableUpdate(
      state,
      { 
        services: services
      }
    )
  }  ,

  [Actions.ORDER_SERVICE_REMOVE_TOPPING]: (state, action) => {

    let services = immutableUpdate(
      [],
      state.services
    )

    const toppingindex = services[action.payload.serviceindex].toppings.indexOf(action.payload.toppingid)
    services[action.payload.serviceindex].toppings.splice(toppingindex, 1)
    
    return immutableUpdate(
      state,
      { 
        services: services
      }
    )
  }  
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer