import immutableUpdate from 'immutable-update'
import * as Actions from './actions'

const initialState = {
  slot: {
    data: [],
    stores: [],
    services: [],
    allergens: [],
    terms: []
  },
  slotbyid: {},
  status: 'loading' // loading, loaded 
} 

const reducers = {

  [Actions.WP_DATA_SET_STATUS]: (state, action) => {

    return immutableUpdate(
      state,
      {
        status: action.payload.status
      }
    )
  },

  [Actions.WP_DATA_LOADED]: (state, action) => { 
    
    const slot = action.payload.data.slot
    const data = action.payload.data.data

    let slotbyid = {}
    if(
      slot == 'services' 
      ||
      slot == 'stores'
    ) {

      slotbyid = {
        [slot]: data
        .reduce((list, item) => {

          list[item.ID] = item
          return list
        }, {})
      }
    }

    return immutableUpdate(
      state,
      {
        slot: {
          [slot] : data
        },
        slotbyid: slotbyid
      }
    )
  }
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer