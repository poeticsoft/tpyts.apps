import * as Actions from 'rdx/actions'

export const wpInit = () => (dispatch, getState) => {

  fetch('https://tupideyotesirvo.com/wp-json/tpyts/data')
  .then(response => response.json().then(json => {

    dispatch(Actions.wpDataReady(json))
  }))
}

export const WP_DATA_READY = 'WP_DATA_READY'
export const wpDataReady = data => ({
  type: WP_DATA_READY,
  payload: { data: data }
})