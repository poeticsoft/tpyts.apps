import * as Actions from 'rdx/actions'

export const wpInit = () => (dispatch, getState) => {

  const requestDatas = Promise.all([
    fetch('https://tupideyotesirvo.com/wp-json/tpyts/data'),   
    fetch('https://tupideyotesirvo.com/wp-json/tpyts/stores'),  
    fetch('https://tupideyotesirvo.com/wp-json/tpyts/services'),  
    fetch('https://tupideyotesirvo.com/wp-json/tpyts/allergens'),  
    fetch('https://tupideyotesirvo.com/wp-json/tpyts/terms')
  ])
  .then(responses => {

    responses[0].json().then(json => dispatch(Actions.wpDataLoaded({
      slot: 'data',
      data: json
    })))

    responses[1].json().then(json => dispatch(Actions.wpDataLoaded({
      slot: 'stores',
      data: json
    })))

    responses[2].json().then(json => dispatch(Actions.wpDataLoaded({
      slot: 'services',
      data: json
    })))

    responses[3].json().then(json => dispatch(Actions.wpDataLoaded({
      slot: 'allergens',
      data: json
    })))

    responses[4].json().then(json => dispatch(Actions.wpDataLoaded({
      slot: 'terms',
      data: json
    })))

    dispatch(Actions.wpDataSetStatus('loaded'))
    
    dispatch(Actions.uiSetMessage({
      text: 'WP Data loaded'
    }))
  })
}

export const WP_DATA_SET_STATUS = 'WP_DATA_SET_STATUS'
export const wpDataSetStatus = status => ({
  type: WP_DATA_SET_STATUS,
  payload: { status: status }
})

export const WP_DATA_LOADED = 'WP_DATA_LOADED'
export const wpDataLoaded = data => ({
  type: WP_DATA_LOADED,
  payload: { data: data }
})