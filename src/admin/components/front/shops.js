import React from 'react'
import { connect } from 'react-redux'
import { 
  Table,
  Button
} from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' }
]

export const Shops = connect(state => ({
  shops: state.fb.shops.data
}))(props => {  

  const data = Object.keys(props.shops)
  .reduce((list, key) => {

    list.push({
      key: key,
      ...props.shops[key]
    })

    return list
  }, [])
  
  return <div className="Front Shops WithTools">
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