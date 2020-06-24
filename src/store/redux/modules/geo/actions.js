import * as Actions from 'rdx/actions'
import { GMaps } from 'utils/config'

export const geoAutocompleteAddress = address => (dispatch, getState) => {

  dispatch(Actions.geoSetApiStatus('loading'))

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
      
      dispatch(Actions.geoSetAutocompletePredictions(predictions))
    })
  })
  .catch(error => {

    console.log(error)
  })
}

export const geoGetAddressToLocation = address => (dispatch, getState) => {

  dispatch(Actions.geoSetApiStatus('loading'))

  console.log(address)

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

      const location = json.results[0].geometry.location
      
      dispatch(Actions.geoSetAddressLocation(location))
    })
  })
  .catch(error => {

    console.log(error)
  })
}

export const GEO_SET_API_STATUS = 'GEO_SET_API_STATUS'
export const geoSetApiStatus = status => ({
  type: GEO_SET_API_STATUS,
  payload: {
    status: status
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