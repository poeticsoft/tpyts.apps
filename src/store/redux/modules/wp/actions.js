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
  'dealers'
]

let refreshPollTime = 30

export const wpRefresh = () => (dispatch, getState) => {

  dispatch(Actions.uiSetMessage({
    text: 'Comprobando datos...'
  }))

  slots
  .forEach(slot => {

    dispatch(Actions.wpUpdateSlot({
      slot: slot,
      data: {
        updated: false
      }
    }))
  })

  dispatch(Actions.wpCheckSlotsUpdated())

  const state = getState().wp

  fetch('/wp-json/tpyts/changes')
  .then(response => response.json().then(changes => {

    const changesRefreshPollTime = parseInt(changes.refreshpolltime)
    refreshPollTime = isNaN(changesRefreshPollTime) ? 
      refreshPollTime
      :
      changesRefreshPollTime

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

        dispatch(Actions.uiSetMessage({
          text: 'Actualizando ' + slot + '...'
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
      } else {

        dispatch(Actions.wpUpdateSlot({
          slot: slot,
          data: {
            updated: true
          }
        }))

        dispatch(Actions.wpCheckSlotsUpdated())
      }
    })
  }))
}

export const wpCheckSlotsUpdated = () => (dispatch, getState) => {

  const state = getState()
  const slot = state.wp.slot
  const slotsupdated = Object.keys(slot)
  .reduce((status, key) => {
    
    return status && slot[key].updated
  }, true)

  dispatch(Actions.wpUpdateStatus({
    ready: slotsupdated ? slotsupdated : state.ready,
    updated: slotsupdated    
  }))

  if(slotsupdated) {

    setTimeout(() => {

      dispatch(Actions.wpRefresh())
    }, refreshPollTime * 1000)
  }
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