import * as Actions from 'rdx/actions'

export const uiSetMessage = data => (dispatch, getState) => { 

  dispatch(Actions.uiShowMessage(data))

  if(!data.hold) {

    setTimeout(() => {

      dispatch(Actions.uiHideMessage(data))
    }, 2000)
  }
}

export const UI_SET_WINDOW = 'UI_SET_WINDOW'
export const uiSetWindow = data => ({
  type: UI_SET_WINDOW,
  payload: {
    data: data
  }
})

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
export const uiSetInitialState = state => ({
  type: UI_SET_INITIAL_STATE,
  payload: {
    state: state
  }
})

export const UI_SET_STORES_ACTIVE = 'UI_SET_STORES_ACTIVE'
export const uiSetStoresActive = storeids => ({
  type: UI_SET_STORES_ACTIVE,
  payload: {
    storeids: storeids
  }
})

export const UI_SET_MAP_STATE = 'UI_SET_MAP_STATE'
export const uiSetMapState = data => ({
  type: UI_SET_MAP_STATE,
  payload: {
    data: data
  }
})

export const UI_SET_GALLERY_STATE = 'UI_SET_GALLERY_STATE'
export const uiSetGalleryState = data => ({
  type: UI_SET_GALLERY_STATE,
  payload: {
    data: data
  }
})


export const UI_SET_SERVICE_INFO_STATE = 'UI_SET_SERVICE_INFO_STATE'
export const uiSetServiceInfoState = data => ({
  type: UI_SET_SERVICE_INFO_STATE,
  payload: {
    data: data
  }
})
export const UI_SET_SHOWCASE_ACTIVE = 'UI_SET_SHOWCASE_ACTIVE'
export const uiSetShowcaseActive = showcase => ({
  type: UI_SET_SHOWCASE_ACTIVE,
  payload: {
    showcase: showcase
  }
})

export const uiSearch = text => (dispatch, getState) => { 

  dispatch(Actions.uiShowMessage({
    text: 'Buscando ' + text
  }))

  dispatch(Actions.uiSetShowcaseActive('search'))

  dispatch(Actions.uiSetSearchStatus({
    status: 'searching',
    text: text
  }))
  
  fetch('/wp-json/wp/v2/search?subtype=service&search=' + text)
  .then(function(response) {

    response.json()
    .then(results => {

      dispatch(Actions.uiSetSearchStatus({
        status: 'found',
        results: results
      }))
    })
  })
  .catch(error => {

    console.log(error)
  })
}

export const UI_SET_SEARCH_STATUS = 'UI_SET_SEARCH_STATUS'
export const uiSetSearchStatus = status => ({
  type: UI_SET_SEARCH_STATUS,
  payload: {
    status: status
  }
})

export const UI_ADD_SERVICE_TO_ORDER = 'UI_ADD_SERVICE_TO_ORDER'
export const uiAddServiceToOrder = serviceid => ({
  type: UI_ADD_SERVICE_TO_ORDER,
  payload: {
    serviceid: serviceid
  }
})

export const UI_REMOVE_SERVICE_FROM_ORDER = 'UI_REMOVE_SERVICE_FROM_ORDER'
export const uiRemoveServiceFromOrder = orderserviceid => ({
  type: UI_REMOVE_SERVICE_FROM_ORDER,
  payload: {
    orderserviceid: orderserviceid
  }
})

export const uiOpenCart = () => (dispatch, getState) => { 

  dispatch(Actions.uiSetCartStatus({
    openstate: 'header'
  }))

  setTimeout(() => {

    dispatch(Actions.uiSetCartStatus({
      openstate: 'wrapper'
    }))

    setTimeout(() => {

      dispatch(Actions.uiSetCartStatus({
        openstate: 'visibles'
      }))
    }, 500)
  }, 500)
}

export const uiCloseCart = () => (dispatch, getState) => {  
  
  dispatch(Actions.uiSetCartStatus({
    openstate: 'wrapper'
  }))  

  setTimeout(() => {

    dispatch(Actions.uiSetCartStatus({
      openstate: 'header'
    }))

    setTimeout(() => {

      dispatch(Actions.uiSetCartStatus({
        openstate: 'hidden'
      }))
    }, 500)
  }, 500)
}

export const UI_SET_CART_STATUS = 'UI_SET_CART_STATUS'
export const uiSetCartStatus = status => ({
  type: UI_SET_CART_STATUS,
  payload: {
    status: status
  }
})

export const UI_SET_ORDER_LOCATION = 'UI_SET_ORDER_LOCATION'
export const uiSetOrderLocation = location => ({
  type: UI_SET_ORDER_LOCATION,
  payload: {
    location: location
  }
})

export const UI_SET_ORDER_LOCATION_ERROR = 'UI_SET_ORDER_LOCATION_ERROR'
export const uiSetOrderLocationError = error => ({
  type: UI_SET_ORDER_LOCATION_ERROR,
  payload: {
    error: error
  }
})

export const UI_SET_CARD_DATA = 'UI_SET_CARD_DATA'
export const uiSetCardData = data => ({
  type: UI_SET_CARD_DATA,
  payload: {
    data: data
  }
})

export const UI_CART_CANCEL = 'UI_CART_CANCEL'
export const uiCartCancel = () => ({ type: UI_CART_CANCEL })

export const uiCartPay = data => (dispatch, getState) => {   

  const fetchConfig = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  
  fetch(
    '/wp-json/tpyts/payments/payment',
    fetchConfig
  )
  .then(function(response) {

    response.json()
    .then(json => {

      console.log(json)
    })
  })
  .catch(error => {

    console.log(error)
  })
}