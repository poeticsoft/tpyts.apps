import React, {
  useEffect
} from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'
import {
  Button
} from 'antd'

const assetsurl = 'https://tupideyotesirvo.com/wp-content/themes/tpyts/apps/assets/'

const Orders = connect(state => ({
  services: state.wp.slotbyid.services,
  ticketlogo: state.ui.ticketlogo
}))(props => {

  const printOrder = () => {

    var commandsToPrint = '<BOLD>Bold <NORMAL><BIG> BIG <NORMAL><BOLD><BIG> BOLDBIG'
    const textEncoded = encodeURI(commandsToPrint);
    location.href = 'intent://' + 
                    textEncoded +
                    '#Intent;scheme=quickprinter;package=pe.diegoveloper.printerserverapp;end;'
  }
  
  return <div
    className="Orders"
  >
    Orders
    <Button
      size="large"
      onClick={ printOrder }
    >PRINT</Button>
  </div>
})

export default Orders