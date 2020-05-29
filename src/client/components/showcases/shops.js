import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'
import { Collapse } from 'antd'
const { Panel } = Collapse

const ShopService = props => <div className="Service">
  Service
</div>

const ShopCover = props => <div className="Cover">
  SHOPCOVER
</div>

const Shops = connect(state => ({
  shops: state.fb.shops.data,
  services: state.fb.services.data
}))(props => {  

  const onChange = value => {

    console.log(value)
  }
  
  return <div className="Showcase Shops">
    <Collapse
      defaultActiveKey={['1']}
      onChange={ onChange }
    >
      {
        Object.keys(props.shops)
        .map(shopkey => <Panel
          key={ shopkey }
          shopid={ shopkey }
          header={ <ShopCover { ...props.shops[shopkey] } />}
        >
          {
            props.shops[shopkey].services
            .map(servicekey => <ShopService
              key={ servicekey }
              { ...props.shops[shopkey].services[servicekey] } 
            />)
          }

        </Panel>)
      }
    </Collapse>
  </div>
})

export default Shops