
export const UI_SET_MESSAGE = 'UI_SET_MESSAGE'
export const uiSetMessage = message => ({
  type: UI_SET_MESSAGE,
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