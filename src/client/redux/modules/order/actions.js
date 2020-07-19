import * as Actions from 'rdx/actions'

export const orderPrepareService = serviceid => (dispatch, getState) => {
  
  const state = getState()
  const serviceHasComplements = state.wp.slotbyid.services[serviceid].servicebasic.toppings
  const newOrderService = {
    serviceid: serviceid
  }
  serviceHasComplements && (newOrderService.toppings = [])

  dispatch(Actions.orderAddService(newOrderService))
}

export const ORDER_ADD_SERVICE = 'ORDER_ADD_SERVICE'
export const orderAddService = data => ({
  type: ORDER_ADD_SERVICE,
  payload: {
    data: data
  }
})

export const ORDER_REMOVE_SERVICE = 'ORDER_REMOVE_SERVICE'
export const orderRemoveService = index => ({
  type: ORDER_REMOVE_SERVICE,
  payload: {
    index: index
  }
})

export const ORDER_SERVICE_TOPPINGS_LIST = 'ORDER_SERVICE_TOPPINGS_LIST'
export const orderServiceToppingsList = serviceid => ({
  type: ORDER_SERVICE_TOPPINGS_LIST,
  payload: {
    serviceid: serviceid
  }
})

export const ORDER_SERVICE_ADD_TOPPING = 'ORDER_SERVICE_ADD_TOPPING'
export const orderServiceAddTopping = data => ({
  type: ORDER_SERVICE_ADD_TOPPING,
  payload: {
    data: data
  }
})

export const ORDER_SERVICE_REMOVE_TOPPING = 'ORDER_SERVICE_REMOVE_TOPPING'
export const orderServiceRemoveTopping = data => ({
  type: ORDER_SERVICE_REMOVE_TOPPING,
  payload: {
    data: data
  }
})