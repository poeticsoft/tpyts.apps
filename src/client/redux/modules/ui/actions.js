import * as Actions from 'rdx/actions'
import { localstorageslots } from 'rdx/localstorage'

export const uiSetInitialStates = states => (dispatch, getState) => {

  Object.keys(localstorageslots)
  .forEach(slot => {

    const action = Actions[slot + 'SetInitialState']
    const data = states[slot]

    dispatch(action(data))
  })
}

export const UI_SET_INITIAL_STATE = 'UI_SET_INITIAL_STATE'
export const uiSetInitialState = data => ({
  type: UI_SET_INITIAL_STATE,
  payload: {
    data: data
  }
})

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