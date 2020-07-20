import * as Actions from 'rdx/actions'

export const CART_SET_INITIAL_STATE = 'CART_SET_INITIAL_STATE'
export const cartSetInitialState = data => ({
  type: CART_SET_INITIAL_STATE,
  payload: {
    data: data
  }
})

export const cartOpen = () => (dispatch, getState) => { 

  dispatch(Actions.cartSetStatus({
    openstate: 'header'
  }))

  setTimeout(() => {

    dispatch(Actions.cartSetStatus({
      openstate: 'wrapper'
    }))

    setTimeout(() => {

      dispatch(Actions.cartSetStatus({
        openstate: 'visible'
      }))
    }, 500)
  }, 500)
}

export const cartClose = () => (dispatch, getState) => {  
  
  dispatch(Actions.cartSetStatus({
    openstate: 'wrapper'
  }))  

  setTimeout(() => {

    dispatch(Actions.cartSetStatus({
      openstate: 'header'
    }))

    setTimeout(() => {

      dispatch(Actions.cartSetStatus({
        openstate: 'hidden'
      }))
    }, 500)
  }, 500)
}

export const CART_SET_STATUS = 'CART_SET_STATUS'
export const cartSetStatus = status => ({
  type: CART_SET_STATUS,
  payload: {
    status: status
  }
})