import * as Actions from 'rdx/actions'

export const uiSearch = text => (dispatch, getState) => { 

  dispatch(Actions.uiShowMessage({
    text: 'Buscando ' + text
  }))

  dispatch(Actions.uiSetShowcaseActive('search'))

  dispatch(Actions.uiSetSearchStatus({
    status: 'searching',
    text: text
  }))
  
  fetch('/wp-json/wp/v2/search?subtype=service&search=' + text)
  .then(function(response) {

    response.json()
    .then(results => {

      dispatch(Actions.uiSetSearchStatus({
        status: 'found',
        results: results
      }))
    })
  })
  .catch(error => {

    console.log(error)
  })
}

export const UI_SET_SEARCH_STATUS = 'UI_SET_SEARCH_STATUS'
export const uiSetSearchStatus = status => ({
  type: UI_SET_SEARCH_STATUS,
  payload: {
    status: status
  }
})