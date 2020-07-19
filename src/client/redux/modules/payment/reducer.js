import immutableUpdate from 'immutable-update'
import * as Actions from './actions'

const initialState = {
  card: {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  }
}

const reducers = {

  [Actions.PAYMENT_SET_CARD_DATA]: (state, action) => { 
    
    console.log(action.payload.data);
    
    return immutableUpdate(
      state,
      { 
        cart: {
          card: action.payload.data
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