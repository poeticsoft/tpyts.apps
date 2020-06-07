import * as Actions from 'rdx/actions'

export const WP_SET_INITIAL_STATE = 'WP_SET_INITIAL_STATE'
export const wpSetInitialState = state => ({
  type: WP_SET_INITIAL_STATE,
  payload: {
    state: state
  }
})

export const slots = [
  'datas',   
  'stores',
  'services',
  'allergens',
  'terms'
]

export const wpInit = () => (dispatch, getState) => {

  dispatch(Actions.wpUpdateStatus({
    status: 'updating'
  }))

  const state = getState().wp

  fetch('/wp-json/tpyts/changes')
  .then(response => response.json().then(changes => {

    slots
    .forEach(slot => {

      const lastChange = changes[slot]
      const stateChanged = state.slot[slot].lastchangedate

      if(stateChanged != lastChange) {        
        
        dispatch(Actions.uiSetMessage({
          text: 'Updating ' + slot
        }))
        
        dispatch(Actions.wpUpdateSlot({
          slot: slot,
          data: {
            updated: false
          }
        }))

        fetch('/wp-json/tpyts/' + slot)
        .then(response => response.json().then(data => {          

          dispatch(Actions.wpUpdateSlot({
            slot: slot,
            data: {
              lastchangedate: lastChange,
              updated: true,
              data: data
            }
          }))

          dispatch(Actions.wpCheckSlotsUpdated())
        }))
      }
    })
  }))
}

export const WP_UPDATE_STATUS = 'WP_UPDATE_STATUS'
export const wpUpdateStatus = status => ({
  type: WP_UPDATE_STATUS,
  payload: { status: status }
})

export const WP_UPDATE_SLOT = 'WP_UPDATE_SLOT'
export const wpUpdateSlot = data => ({
  type: WP_UPDATE_SLOT,
  payload: { data: data }
})

export const WP_CHECK_SLOTS_UPDATED = 'WP_CHECK_SLOTS_UPDATED'
export const wpCheckSlotsUpdated = data => ({ type: WP_CHECK_SLOTS_UPDATED })