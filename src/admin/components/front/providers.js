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

export const Providers = connect(state => ({
  providers: state.fb.providers.data
}))(props => {  

  const data = Object.keys(props.providers)
  .reduce((list, key) => {

    list.push({
      key: key,
      ...props.providers[key]
    })

    return list
  }, [])
  
  return <div className="Front Providers WithTools">
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