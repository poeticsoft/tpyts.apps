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


export const UI_SET_MAP_STATE = 'UI_SET_MAP_STATE'
export const uiSetMapState = data => ({
  type: UI_SET_MAP_STATE,
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