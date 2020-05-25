import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'
import {
  Button
} from 'antd'

const Provider = props => <div
  className="Provider"
>
    { props.name }
</div>

const Manage = connect(state => (
  { providers: state.data.providers }
))(props => {

  const addProvider = () => {

    props.dispatch(Actions.fbAddProvider({
      name: 'Name ' + Math.round(Math.random() * 1000)
    }))
  }

  return <div 
    className="Manage"
  > 
    <div>{ props.providers.ready ? 'Ready' : 'Loading' }</div>
    {
      props.providers.ready &&
      <div className="List">
        {
          Object.keys(props.providers.list)
          .map(key => <Provider
            key={ key } 
            { ...props.providers.list[key] } 
          />)
        }
      </div>
    }
    <Button 
      size="small"
      type="primary"
      onClick={ addProvider }>ADD PROVIDER</Button>
  </div>
})

export default Manage