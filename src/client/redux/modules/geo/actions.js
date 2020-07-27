import * as Actions from 'rdx/actions'
import { GMaps } from 'utils/config'

export const geoAutocompleteAddress = address => (dispatch, getState) => {  

  dispatch(Actions.geoSetStatus({
    predictionsstatus: 'validating'
  }))

  const fetchConfig = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      key: GMaps.key,
      address: address.replace(' ', '+')
    })
  }
  
  fetch(
    '/wp-json/tpyts/geo/autocomplete',
    fetchConfig
  )
  .then(function(response) {

    response.json()
    .then(json => {

      const predictions = json.predictions.map(prediction => ({ value: prediction.description }))
      
      dispatch(Actions.geoSetStatus({
        predictionsstatus: 'warning',
        autocompletepredictions: [{ value: address }]
          .concat(
            predictions
            .filter(prediction => prediction.value != address)
          )
      }))
    })
  })
  .catch(error => {

    dispatch(Actions.geoSetStatus({
      predictionsstatus: 'error'
    }))
  })
}

export const geoGetAddressToLocation = () => (dispatch, getState) => {

  const state = getState()
  const address = state.location.form.address     

  dispatch(Actions.locationSet({
    addresstolocationstatus: 'searching'
  }))

  const fetchConfig = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      key: GMaps.key,
      address: address.replace(' ', '+')
    })
  }
  
  fetch(
    '/wp-json/tpyts/geo/addresstolocation',
    fetchConfig
  )
  .then(function(response) {

    response.json()
    .then(json => {

      if(json.results.length) {

        const location = json.results[0].geometry.location 

        dispatch(Actions.locationSet({
          addresslocation: location
        }))     

        dispatch(Actions.locationSet({
          addresstolocationstatus: 'ok'
        }))

      } else {    

        dispatch(Actions.locationSet({
          addresstolocationstatus: 'ko'
        }))        
      }
    })
  })
  .catch(error => {     

    dispatch(Actions.geoSetStatus({
      addresstolocationstatus: 'ko'
    }))
  })
}

export const GEO_SET_STATUS = 'GEO_SET_STATUS'
export const geoSetStatus = data => ({
  type: GEO_SET_STATUS,
  payload: {
    data: data
  }
})

export const GEO_SET_AUTOCOMPLETE_PREDICTIONS = 'GEO_SET_AUTOCOMPLETE_PREDICTIONS'
export const geoSetAutocompletePredictions = results => ({
  type: GEO_SET_AUTOCOMPLETE_PREDICTIONS,
  payload: {
    results: results
  }
})

export const GEO_SET_ADDRESS_LOCATION = 'GEO_SET_ADDRESS_LOCATION'
export const geoSetAddressLocation = location => ({
  type: GEO_SET_ADDRESS_LOCATION,
  payload: {
    location: location
  }
})