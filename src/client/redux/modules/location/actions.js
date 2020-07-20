import * as Actions from 'rdx/actions'

export const LOCATION_SET_INITIAL_STATE = 'LOCATION_SET_INITIAL_STATE'
export const locationSetInitialState = data => ({
  type: LOCATION_SET_INITIAL_STATE,
  payload: {
    data: data
  }
})

export const LOCATION_SET = 'LOCATION_SET'
export const locationSet = location => ({
  type: LOCATION_SET,
  payload: {
    location: location
  }
})

export const LOCATION_ERROR = 'LOCATION_ERROR'
export const locationError = error => ({
  type: LOCATION_ERROR,
  payload: {
    error: error
  }
})