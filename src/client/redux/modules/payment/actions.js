import * as Actions from 'rdx/actions'

export const PAYMENT_SET_CARD_DATA = 'PAYMENT_SET_CARD_DATA'
export const paymentSetCardData = data => ({
  type: PAYMENT_SET_CARD_DATA,
  payload: {
    data: data
  }
})

export const paymentPay = data => (dispatch, getState) => {   

  const fetchConfig = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  
  fetch(
    '/wp-json/tpyts/payments/payment',
    fetchConfig
  )
  .then(function(response) {

    response.json()
    .then(json => {

      console.log(json)
    })
  })
  .catch(error => {

    console.log(error)
  })
}