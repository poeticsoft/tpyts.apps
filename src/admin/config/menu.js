import React from 'react'
import * as Icons from '@ant-design/icons';
import * as Front from 'comps/front';

export const options = {
  orders: {
    icon: <Icons.CommentOutlined />,
    front: <Front.Orders />
  },
  dealers: {
    icon: <Icons.TeamOutlined />,
    front: <Front.Dealers />
  },
  services: {
    icon: <Icons.ProfileOutlined />,
    front: <Front.Services />
  },
  shops: {
    icon: <Icons.ShopOutlined />,
    front: <Front.Shops />
  },
  providers: {
    icon: <Icons.SolutionOutlined />,
    front: <Front.Providers />
  }
}