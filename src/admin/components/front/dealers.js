import React from 'react'
import { connect } from 'react-redux'
import { 
  Table,
  Button
} from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Type', dataIndex: 'type', key: 'type' },
  { title: 'Status', dataIndex: 'status', key: 'status' }
]

export const Dealers = connect(state => ({
  dealers: state.fb.dealers.data
}))(props => {  

  const data = Object.keys(props.dealers)
  .reduce((list, key) => {

    list.push({
      key: key,
      ...props.dealers[key]
    })

    return list
  }, [])
  
  return <div className="Front Dealers WithTools">
    <div className="Tools">
      <Button>
        <PlusCircleOutlined /> TOOL
      </Button>
    </div>
    <Table
      className="Table"
      columns={ columns }
      dataSource={  data }
      size="small"
      pagination={ false }      
      bordered
      scroll={{ y: 'calc(100% - 38px)' }}
    />
  </div>
})