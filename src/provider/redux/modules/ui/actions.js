import * as Actions from 'rdx/actions'

export const uiSetMessage = data => (dispatch, getState) => { 

  dispatch(Actions.uiShowMessage(data))

  if(!data.hold) {

    setTimeout(() => {

      dispatch(Actions.uiHideMessage(data))
    }, 2000)
  }
}

export const UI_SHOW_MESSAGE = 'UI_SHOW_MESSAGE'
export const uiShowMessage = message => ({
  type: UI_SHOW_MESSAGE,
  payload: {
    message: message
  }
})

export const UI_HIDE_MESSAGE = 'UI_HIDE_MESSAGE'
export const uiHideMessage = message => ({
  type: UI_HIDE_MESSAGE,
  payload: {
    message: message
  }
})

export const UI_SET_INITIAL_STATE = 'UI_SET_INITIAL_STATE'
export const uiSetInitialState = data => ({
  type: UI_SET_INITIAL_STATE,
  payload: {
    data: data
  }
})

export const UI_SET_SHOP_ACTIVE = 'UI_SET_SHOP_ACTIVE'
export const uiSetShopActive = shopid => ({
  type: UI_SET_SHOP_ACTIVE,
  payload: {
    shopid: shopid
  }
})

export const UI_SET_SERVICE_ACTIVE = 'UI_SET_SERVICE_ACTIVE'
export const uiSetServiceActive = serviceid => ({
  type: UI_SET_SERVICE_ACTIVE,
  payload: {
    serviceid: serviceid
  }
})

uiSetShopActive