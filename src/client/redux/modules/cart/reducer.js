import React from 'react'
import immutableUpdate from 'immutable-update'
import Order from 'comps/cartsteps/order'
import Location from 'comps/cartsteps/location'
import Payment from 'comps/cartsteps/payment'
import * as Icons from '@ant-design/icons'
import * as Actions from './actions'

const initialState = {
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
} 

const reducers = { 
  
  [Actions.CART_SET_INITIAL_STATE]: (state, action) => immutableUpdate(
    state,
    action.payload.data
  ),
  
  [Actions.CART_SET_STATUS]: (state, action) => immutableUpdate(
    state,
    action.payload.status
  )
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer