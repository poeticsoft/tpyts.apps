import React from 'react'
import { connect } from 'react-redux'
import { options } from 'config/menu';

export const AdminFront = connect(state => ({
  optionselected: state.ui.adminmenuoptionselected
}))(props => {  
  
  return <div className="AdminFront">
    { 
      props.optionselected && 
      options[props.optionselected].front
    }
  </div>
})