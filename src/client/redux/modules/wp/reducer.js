import immutableUpdate from 'immutable-update'
import * as Actions from './actions'

const initialState = {
  updated: false,
  slot: {
    datas: {
      lastchangedate: '',
      updated: false,
      data: {}
    },
    stores: {
      lastchangedate: '',
      updated: false,
      data: []
    },
    services: {
      lastchangedate: '',
      updated: false,
      data: []
    },
    allergens: {
      lastchangedate: '',
      updated: false,
      data: []
    },
    toppings: {
      lastchangedate: '',
      updated: false,
      data: []
    },
    terms: {
      lastchangedate: '',
      updated: false,
      data: []
    }
  },
  slotbyid: {}
} 

const reducers = {  
  
  [Actions.WP_SET_INITIAL_STATE]: (state, action) => immutableUpdate(
    state,
    action.payload.data
  ),

  [Actions.WP_UPDATE_STATUS]: (state, action) => {

    return immutableUpdate(
      state,
      { ...action.payload.status }
    )
  },

  [Actions.WP_UPDATE_SLOT]: (state, action) => { 
    
    const slot = action.payload.data.slot
    const data = action.payload.data.data

    let newState = {
      slot: {
        [slot] : data
      }
    }

    if(  
      data.data &&
      (   
        slot == 'stores'
        ||
        slot == 'services'
        ||
        slot == 'allergens'
        ||
        slot == 'toppings'
      )  
    ) {
      
      newState.slotbyid = {
        [slot]: data.data
        .reduce((list, item) => {

          list[item.ID] = item
          return list
        }, {})
      }
    }
    
    return immutableUpdate(
      state,
      { ...newState }
    )
  }
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer