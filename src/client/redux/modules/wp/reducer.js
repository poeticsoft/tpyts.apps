import immutableUpdate from 'immutable-update'
import * as Actions from './actions'

const initialState = {
  ready: false,
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
    action.payload.state
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
  },

  [Actions.WP_CHECK_SLOTS_UPDATED]: (state, action) => {

    const slotsupdated = Object.keys(state.slot)
    .reduce((status, key) => {
      
      return status && state.slot[key].updated
    }, true)

    return immutableUpdate(
      state,
      { 
        ready: slotsupdated
      }
    )
  },
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer