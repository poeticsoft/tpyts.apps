import React from 'react'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Icons from '@ant-design/icons'
import * as Actions from 'rdx/actions'

const Pedir = connect(state => ({
  orderservices: state.ui.order.services
}))(props => { 

  const inc = (e, n) => {    

    e.stopPropagation()

    props.dispatch(Actions.uiAddServiceToOrder (props.serviceid))
  }
  
  return <div className="Pedir">
    <div className="Text">Quiero</div>       
    <Button 
      shape="circle"
      onClick={ e => inc(e, 1) }
    >
      <Icons.PlusOutlined />
    </Button>
  </div>
})

export default Pedir