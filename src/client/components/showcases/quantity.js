import React, {
  useState
} from 'react'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Icons from '@ant-design/icons'
import * as Actions from 'rdx/actions'

const Quantity = connect(state => ({
}))(props => {  

  const [ quantity, setQuantity ] = useState(1)

  const inc = (e, n) => {    

    e.stopPropagation()

    const Q = quantity + n
    Q > 0 &&
    setQuantity(quantity + n)
  }
  
  return <div className="Quantity"> 
    <Button
      type="primary" 
      shape="circle"
      onClick={ e => inc(e, -1) }
      className="Down"
      size="small"
      disabled={ quantity < 2 }
    >
      <Icons.DownCircleOutlined />
    </Button>   
    <div className="Number">{ quantity }</div>       
    <Button
      type="primary" 
      shape="circle"
      onClick={ e => inc(e, 1) }
      className="Up"
      size="small"
    >
      <Icons.UpCircleOutlined/>
    </Button>
    <Button
      type="primary" 
      shape="circle"
      className="Add"
    >
      <Icons.PlusCircleOutlined />
    </Button>
  </div>
})

export default Quantity