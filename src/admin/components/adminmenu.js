import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'
import { Menu } from 'antd';
import { options } from 'config/menu';

export const AdminMenu = connect(state => ({
  optionselected: state.ui.adminmenuoptionselected,
  fb: state.fb
}))(props => {   

  const setSelect = selection => {

    props.dispatch(Actions.uiSelectAdminMenuOption(selection.key))
  }
  
  return <div className="AdminMenu">
    <Menu 
      onClick={ setSelect } 
      selectedKeys={ [ props.optionselected ] } 
      mode="horizontal"
    >
      {
        Object.keys(options)
        .map(key => <Menu.Item
          key={ key } 
          icon={ options[key].icon }
          disabled={ props.fb[key].status != 'ready' }
        >
          { key }
        </Menu.Item>)
      }
    </Menu>
  </div>
})