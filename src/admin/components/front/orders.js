import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'Confirmado', dataIndex: 'confirmeddate', key: 'confirmeddate' }
]

export const Orders = connect(state => ({
  orders: state.fb.orders.data
}))(props => {  

  const data = Object.keys(props.orders)
  .reduce((list, key) => {

    list.push({
      key: key,
      ...props.orders[key]
    })

    return list
  }, [])
  
  return <div className="Front Orders">
    <Table
      columns={ columns }
      dataSource={  data }
      size="small"
      pagination={ false }
      bordered
      scroll={{ y: 'calc(100% - 38px)' }}
    />
  </div>
})