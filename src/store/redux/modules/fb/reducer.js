import immutableUpdate from 'immutable-update'
import * as Actions from './actions'

const initialState = {
  stores: {
    status: 'empty',
    data: {}
  },
  services: {
    status: 'empty',
    data: {}
  },
  dealers: {
    status: 'empty',
    data: {}
  },
  orders:{
    status: 'empty',
    data: {}
  }
} 

const reducers = { 

  [Actions.FB_SET_BASE_DATA]: (state, action) => {
    
    const baseData = Object.keys(action.payload.data)
    .reduce((list, key) => {

      list[key] = {
        status: 'ready',
        data: action.payload.data[key]
      }

      return list
    }, {})

    return immutableUpdate(
      state,
      baseData
    )
  },
  
  [Actions.FB_ADDED]: (state, action) => {

    const slot = action.payload.data.slot
    const key = action.payload.data.data.key
    const value = action.payload.data.data.val()

    return immutableUpdate(
      state,
      {
        [slot]: {
          status: 'loading',
          data: {
            [key]: value
          }
        }
      }
    )
  },
  
  [Actions.FB_CHANGED]: (state, action) => {

    const slot = action.payload.data.slot
    const key = action.payload.data.data.key
    const value = action.payload.data.data.val() 

    return immutableUpdate(
      state,
      {
        [slot]: {
          status: 'loading',
          data: {
            [key]: value
          }
        }
      }
    )
  },
  
  [Actions.FB_REMOVED]: (state, action) => {

    const key = action.payload.data.data.key 

    console.log('DELETE ' + key)

    return state
  },
  
  [Actions.FB_READY]: (state, action) => {

    const slot = action.payload.data.slot

    return immutableUpdate(
      state,
      {
        [slot]: {
          status: 'ready'
        }
      }
    )
    
    return state
  }
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer